using BusinessLogic.Shared.Interfaces;
using Quartz;
using Quartz.Impl;
using Web.Core.Bundles.Models;

namespace Web.Core.Bundles
{
    public class AppScheduler
    {
        private static ILogRepository _logRepository;
        public static void Configure(IConfiguration config, ILogRepository logRepository)
        {
            _logRepository = logRepository;

            var factory = new StdSchedulerFactory();
            var scheduler = factory.GetScheduler().Result;

            ScheduleJob("Database Migrator",
                scheduler,
                DateBuilder.NextGivenMinuteDate(null, 1),
                SimpleScheduleBuilder.Create()
                .WithIntervalInHours(24)
                .RepeatForever(),
                config.GetRequiredSection("DataBaseMigrationEndpoint").Value?? "",
                5000);
        }

        private static void ScheduleJob(string jobName, IScheduler schreduler, DateTimeOffset start, IScheduleBuilder buider, string url, int timeoutSeconds)
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
                    {
                        nameof(WebScheduleJob.LogRepository),
                        _logRepository
                    },
                    {
                        nameof(WebScheduleJob.JobName),
                        jobName
                    }
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
