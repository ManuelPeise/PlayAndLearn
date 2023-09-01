

using Data.AppData;
using Shared.Games.Models;
using Shared.Models.Enums.Games;

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

        public List<GameLevelType> GetLevelTypeItems()
        {
            return new List<GameLevelType>
            {
                new GameLevelType {Key = (int)GameLevelTypeEnum.Easy, Value = "Leicht"},
                new GameLevelType {Key = (int)GameLevelTypeEnum.Medium, Value = "Mittel"},
                new GameLevelType {Key = (int)GameLevelTypeEnum.Hard, Value = "Schwer"},
            };
        }

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
