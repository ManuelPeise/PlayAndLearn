using Microsoft.AspNetCore.Mvc;
using Services.Shared;

namespace Service.Availability.Controllers
{
    public class AvailabilityController: ApiControllerBase
    {
        [HttpGet]
        public async Task<bool> IsAvailable()
        {
            return true;
        }
    }
}
