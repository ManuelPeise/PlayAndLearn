using Microsoft.AspNetCore.Mvc;

namespace Services.Shared
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ApiControllerBase : ControllerBase
    {
        public ApiControllerBase()
        {
            
        }
    }
}