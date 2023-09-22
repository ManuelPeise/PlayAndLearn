using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Enums.Games;
using Shared.Models.Games;
using Shared.Models.Games.Memory;

namespace BusinessLogic.Shared
{
    public abstract class AGameHandler: IDisposable
    {
        public readonly AppDataContext AppDataContext;
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;
        private ILogRepository _logRepository;
        public AGameHandler(AppDataContext appDataContext, ILogRepository logRepository)
        {
            AppDataContext = appDataContext;
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _logRepository = logRepository;
        }

        public abstract Task<ASettingsBarData> GetSettingsBarData();

        public async Task<List<KeyValueItem>> GetTopicDropdownItems(GameTypeEnum gameType)
        {
            try
            {
                var topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == gameType);

                var topicDropdownItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "labelSelect" } };
                topicDropdownItems.AddRange(from topic in topics
                                            select new KeyValueItem
                                            {
                                                Key = topic.Id,
                                                Value = topic.TopicName
                                            });

                return topicDropdownItems;
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading dropdown items failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new List<KeyValueItem>();
            }
        }
        public List<KeyValueItem> GetLevelDropdownItems()
        {
            return new List<KeyValueItem>
            {
                new KeyValueItem {Key = 0, Value = "labelSelect"},
                new KeyValueItem {Key = 1, Value = "labelEasy"},
                new KeyValueItem {Key = 2, Value = "labelMedium"},
                new KeyValueItem {Key = 3, Value = "labelHard"},
            };
        }

        public List<KeyValueItem> GetPlayerDropdownItems()
        {
            return new List<KeyValueItem>
            {
                new KeyValueItem
                {
                    Key = 0,
                    Value = "labelSelect"
                },
                new KeyValueItem
                {
                    Key = 1,
                    Value = "labelPlayerOne"
                },
                new KeyValueItem
                {
                    Key = 2,
                    Value = "labelPlayerTwo"
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
