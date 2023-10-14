using Quartz;

namespace Web.Core.Bundles.Models
{
    public class WebScheduleJob : IJob
    {
        public int TimoutSeconds { get; set; } = 5000;
        public string RequestUri { get; set; } = string.Empty;


        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                using (var client = new HttpClient() { Timeout = TimeSpan.FromSeconds(TimoutSeconds) })
                {
                    var response = await client.GetAsync(RequestUri);

                    response.EnsureSuccessStatusCode();
                }

            }
            catch (Exception exception)
            {

            }
        }
    }
}
