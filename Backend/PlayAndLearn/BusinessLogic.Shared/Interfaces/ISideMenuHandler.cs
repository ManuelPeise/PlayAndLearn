using Shared.Models.Infrastructure;

namespace BusinessLogic.Shared.Interfaces
{
    public interface ISideMenuHandler: IDisposable
    {
        Task<SideMenu> GetPublicMenu();
    }
}
