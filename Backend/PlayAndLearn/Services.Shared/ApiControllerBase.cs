using Microsoft.AspNetCore.Mvc;

namespace Services.Shared
{
    [Route("[controller]/[action]")]
    public class ApiControllerBase : ControllerBase
    {
        public ApiControllerBase()
        {
            
        }
    }
}