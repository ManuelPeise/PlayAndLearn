

using Data.AppData;
using Shared.Games.Models;

namespace BusinessLogic.Shared
{
    public abstract class AGameHandler: IDisposable
    {
        public readonly AppDataContext AppDataContext;

        public AGameHandler(AppDataContext appDataContext)
        {
            AppDataContext = appDataContext;
        }

        public abstract Task<AGameSettingsBarData> GetSettingsBarData();

        #region dispose

        private bool disposedValue;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    AppDataContext.Dispose();
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
