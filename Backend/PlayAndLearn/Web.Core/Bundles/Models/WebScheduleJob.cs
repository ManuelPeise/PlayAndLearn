using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Quartz;
using Shared.Models.Entities;

namespace Web.Core.Bundles.Models
{
    public class WebScheduleJob : IJob
    {
        public int TimoutSeconds { get; set; } = 5000;
        public string RequestUri { get; set; } = string.Empty;
        public string JobName { get; set; } = string.Empty;
        public ILogRepository LogRepository { get; set; }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                using (var client = new HttpClient() { Timeout = TimeSpan.FromSeconds(TimoutSeconds) })
                {
                    var response = await client.GetAsync(RequestUri);

                    response.EnsureSuccessStatusCode();
                }

            }catch (Exception exception) 
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = $"Could execute scheduled job: {JobName}.",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Scheduled Job",
                    TimeStamp = DateTime.UtcNow
                };

                await LogRepository.AddLogMessage(logMessage);

            }
        }
    }
}
