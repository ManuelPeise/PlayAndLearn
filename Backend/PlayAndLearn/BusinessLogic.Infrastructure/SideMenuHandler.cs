using BusinessLogic.Shared.Interfaces;
using Shared.Models.Infrastructure;

namespace BusinessLogic.Infrastructure
{
    public class SideMenuHandler : ISideMenuHandler
    {
        private bool disposedValue;
        private readonly ILogRepository _logRepository;

        public SideMenuHandler(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        public async Task<SideMenu> GetPublicMenu()
        {
            return new SideMenu
            {
                MenuHeader = new SideMenuHeader { MenuTitle = MenuItemKeys.AppTitleKey },
                Items = new List<SideMenuItem>
                {
                    new SideMenuItem
                    {
                        Title = MenuItemKeys.MenuItemGamesKey,
                        Route = "/games"
                    }
                }
            };
        }


        #region dispose

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _logRepository.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
