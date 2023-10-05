using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Enums.Import;
using Shared.Models.Games.Memory;
using Shared.Models.Import;

namespace BusinessLogic.Games
{
    public class Memory : IMemory
    {
        private readonly ILogRepository _logRepository;
        private readonly AppDataContext _appDataContext;
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;
        private IGenericDbContextAccessor<FileStorageEntity> _fileStorageAccessor;
        private IGenericDbContextAccessor<HighScore> _highScoreAccessor;
        private bool disposedValue;

        public Memory(ILogRepository logRepository, AppDataContext appDataContext)
        {
            _logRepository = logRepository;
            _appDataContext = appDataContext;
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _fileStorageAccessor = new GenericDbContextAccessor<FileStorageEntity>(appDataContext);
            _highScoreAccessor = new GenericDbContextAccessor<HighScore>(appDataContext);
        }

        public async Task<MemorySettings> GetSettingsBarData()
        {
            try
            {
                return new MemorySettings
                {
                    TopicItems = await GetTopicDropdownItems(),
                    LevelItems = GetLevelDropdownItems(),
                    PlayerItems = GetPlayerDropdownItems()
                };
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading settings bar dropdown items failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }

            return new MemorySettings
            {
                TopicItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "labelSelect" } },
                LevelItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "labelSelect" } },
                PlayerItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "labelSelect" } }
            };
        }
        public async Task<List<MemoryFileMapping>> GetMemoryCards(int topicId)
        {
            try
            {

                if (topicId != -1)
                {
                    var topic = await _gameTopicAccessor.GetEntityAsync(x => x.Id == topicId);

                    var files = await _fileStorageAccessor.GetEntitiesAsync(x => x.Module == "Memory" && x.Topic == topic.TopicName);

                    if (files.Any())
                    {
                        return GetCardFileMappings(files).ToList();
                    }

                    return new List<MemoryFileMapping>();
                }

                throw new Exception($"Could not load cards, reason: {topicId} is not available!");
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading game settings data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new List<MemoryFileMapping>();
            }
        }
        public async Task<List<MemoryHighscoreListExport>> GetHighscoreList()
        {
            try
            {
                var entities = await _highScoreAccessor.GetAllEntitiesAsync();

                if (entities.Any())
                {
                    return (from entity in entities
                            group entity by entity.Level into entityLevelGrp
                            select new MemoryHighscoreListExport
                            {
                                Level = entityLevelGrp.Key,
                                List = entityLevelGrp.OrderBy(x => x.Attemts).Take(10).ToList()
                            }).ToList();
                }
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading high score data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }

            return new List<MemoryHighscoreListExport>
            {
                new MemoryHighscoreListExport{ Level = 1, List = new List<HighScore>()},
                new MemoryHighscoreListExport{ Level = 2, List = new List<HighScore>()},
                new MemoryHighscoreListExport{ Level = 3, List = new List<HighScore>()}
            };
        }
        public async Task StoreHighscore(HighScore highscore)
        {
            try
            {
                var rows = await _highScoreAccessor.AddAsync(highscore, x => x.Attemts == highscore.Attemts && x.Name == highscore.Name);

                if(rows != 1)
                {
                    throw new Exception("Store high score failed!");
                }

            }catch(Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Store high score data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }
        }
        public async Task StoreTopic(TopicImportModel importModel)
        {
            try
            {
                var existing = await _gameTopicAccessor.GetEntityAsync(x => x.TopicName.Equals(importModel.TopicName));

                if(existing == null)
                {
                    await _gameTopicAccessor.AddAsync(new GameTopicEntity 
                    { 
                        TopicType = importModel.TopicType, 
                        TopicName = importModel.TopicName 
                    }, 
                    x => x.TopicName.Equals(importModel.TopicName));
                }


            }catch(Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Could not store new topic.",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }
        }
        public async Task<List<KeyValueItem>> GetTopicItems()
        {
            try
            {
                return await GetTopicDropdownItems();

            }catch(Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Could load topics from database.",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }

            return new List<KeyValueItem>();
        }
        #region private
        private async Task<List<KeyValueItem>> GetTopicDropdownItems()
        {

            var topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.TopicType == TopicTypeEnum.Memory);

            var topicDropdownItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "labelSelect" } };
            topicDropdownItems.AddRange(from topic in topics
                                        select new KeyValueItem
                                        {
                                            Key = topic.Id,
                                            Value = topic.TopicName
                                        });

            return topicDropdownItems;

        }
        private List<KeyValueItem> GetLevelDropdownItems()
        {
            return new List<KeyValueItem>
            {
                new KeyValueItem {Key = 0, Value = "labelSelect"},
                new KeyValueItem {Key = 1, Value = "labelEasy"},
                new KeyValueItem {Key = 2, Value = "labelMedium"},
                new KeyValueItem {Key = 3, Value = "labelHard"},
            };
        }
        private List<KeyValueItem> GetPlayerDropdownItems()
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
                    Value = "labelVsAi"
                },
                new KeyValueItem
                {
                    Key = 3,
                    Value = "labelPlayerTwo"
                },

            };
        }
        private async Task<int> GetTopicId(string topicName)
        {
            var topic = await _gameTopicAccessor.GetEntityAsync(x => x.TopicName == topicName);

            if (topic == null)
            {
                return -1;
            }

            return topic.Id;
        }
        private List<MemoryFileMapping> GetCardFileMappings(List<FileStorageEntity> cards)
        {
            var mappings = new List<MemoryFileMapping>();

            if (!cards.Any())
            {
                return mappings;
            }

            foreach (var card in cards)
            {
                var mapping = new MemoryFileMapping
                {
                    Key = card.Id,
                    Topic = card.Topic,
                    FileName = card.FileName,
                    IsActive = true,
                    Buffer = card.Content,
                };

                mappings.Add(mapping);

            }



            return mappings;
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _logRepository.Dispose();
                    _highScoreAccessor.Dispose();
                    _appDataContext.Dispose();
                    _fileStorageAccessor.Dispose();
                    _gameTopicAccessor.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion

        #endregion
    }
}
