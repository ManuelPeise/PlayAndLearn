using Data.AppData;
using Shared.Games.Models;
using Shared.Models;
using Shared.Models.Enums.Games;

using Shared.Models.Games;

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

        public abstract Task<MemoryPageData> GetGameData(MemoryGameDataRequestModel requestModel);

        public abstract Task<MemoryPageData> GetPageData();
        public List<KeyValueItem> GetLevelDropdownItems()
        {
            return new List<KeyValueItem>
            {
                new KeyValueItem {Key = 0, Value = "select"},
                new KeyValueItem {Key = 1, Value = "easy"},
                new KeyValueItem {Key = 2, Value = "medium"},
                new KeyValueItem {Key = 3, Value = "hard"},
            };
        }

        public List<KeyValueItem> GetPlayerDropdownItems()
        {
            return new List<KeyValueItem>
            {
                new KeyValueItem
                {
                    Key = 0,
                    Value = "select"
                },
                new KeyValueItem
                {
                    Key = 1,
                    Value = "playerOne"
                },
                new KeyValueItem
                {
                    Key = 2,
                    Value = "playerTwo"
                }
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
