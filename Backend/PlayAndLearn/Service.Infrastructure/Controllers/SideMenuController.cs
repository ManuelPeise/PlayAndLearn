using BusinessLogic.Shared.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models.Infrastructure;

namespace Service.Infrastructure.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class SideMenuController: ControllerBase
    {
        private readonly ISideMenuHandler _handler;

        public SideMenuController(ISideMenuHandler handler)
        {
            _handler = handler;
        }

        [HttpGet(Name = "GetPublicMenu")]
        public async Task<SideMenu> GetPublicMenu()
        {
            return await _handler.GetPublicMenu();
        }
    }
}
