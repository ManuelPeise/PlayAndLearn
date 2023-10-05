using BusinessLogic.Shared.Interfaces;
using Quartz;
using Quartz.Impl;
using Web.Core.Bundles.Models;

namespace Web.Core.Bundles
{
    public class AppScheduler
    {

        public static void Configure(IConfiguration config)
        {
            var factory = new StdSchedulerFactory();
            var scheduler = factory.GetScheduler().Result;

            ScheduleJob(scheduler,
                DateBuilder.NextGivenMinuteDate(null, 1),
                SimpleScheduleBuilder.Create()
                .WithIntervalInHours(24)
                .RepeatForever(),
                config.GetRequiredSection("DataBaseMigrationEndpoint").Value ?? "",
                5000);

            scheduler.Start();
        }

        private static void ScheduleJob(IScheduler schreduler, DateTimeOffset start, IScheduleBuilder buider, string url, int timeoutSeconds)
        {
            var job = JobBuilder
                .Create<WebScheduleJob>()
                .SetJobData(new JobDataMap
                {
                    {
                        nameof(WebScheduleJob.TimoutSeconds),
                        timeoutSeconds
                    },
                    {
                        nameof(WebScheduleJob.RequestUri),
                        url
                    },
                })
                .Build();

            var trigger = TriggerBuilder
                .Create()
                .StartAt(start)
                .WithSchedule(buider)
                .Build();

            schreduler.ScheduleJob(job, trigger).Wait();
        }
    }
}
