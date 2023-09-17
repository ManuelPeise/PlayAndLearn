using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Shared.Games.Models;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Enums.Games;
using Shared.Models.Export;
using Shared.Models.Games;
using System.Reflection;
using System.Text;

namespace BusinessLogic.Games
{
    public class MemoryGameHandler : AGameHandler
    {
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;
        private IGenericDbContextAccessor<GameSettingsEntity> _gameSettingsAccessor;
        private IGenericDbContextAccessor<FileStorageEntity> _fileStorageAccessor;
        private ILogRepository _logRepository;

        public MemoryGameHandler(ILogRepository logRepository, AppDataContext appDataContext) : base(appDataContext)
        {
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _gameSettingsAccessor = new GenericDbContextAccessor<GameSettingsEntity>(appDataContext);
            _fileStorageAccessor = new GenericDbContextAccessor<FileStorageEntity>(appDataContext);

            _logRepository = logRepository;
        }

        public override async Task<MemoryPageData> GetGameData(MemoryGameDataRequestModel requestModel)
        {
            return null;
        }

        public override async Task<AGameSettingsBarData> GetSettingsBarData()
        {
            try
            {
                return new MemorySettingsBarData
                {
                    Title = "Memory",
                    LevelDropdownItems = GetLevelDropdownItems(),
                    PlayerDropdownItems = GetPlayerDropdownItems(),
                    TopicDropdownItems = await GetTopicDropdownItems()
                };
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading settings bar data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new MemorySettingsBarData
                {
                    Title = "Memory",
                };
            }
        }

        public async Task<GameSettings> GetInitializeSettingsState()
        {
            return new GameSettings
            {
                Files = new List<FileMapping>(),
                HasLevelSelection = false,
                HasPlayerSelection = false,
                HasTopicSelection = true,
                Topic = string.Empty,
                TopicFallbackValue = string.Empty,
                Topics = await GetTopicDropdownItems()
            };
        }

        public async Task<GameSettings> GetGameSettings(string topicName)
        {
            try
            {
                var topicId = await GetTopicId(topicName);

                if (topicId != -1)
                {
                    var settings = await _gameSettingsAccessor.GetEntityAsync(x => x.TopicId == topicId);
                    var files = await _fileStorageAccessor.GetEntitiesAsync(x => x.Module == FileModuls.MemoryFileModules.Module && x.Topic == topicName);

                    return new GameSettings
                    {
                        HasLevelSelection = settings.HasLevelSelection,
                        HasPlayerSelection = settings.HasPlayerSelection,
                        HasTopicSelection = settings.HasTopicSelection,
                        Topic = topicName,
                        TopicFallbackValue = topicName,
                        Topics = await GetSettingsDropdownTopicItems(),
                        Files = files.Any() ? GetCardFileMappings(files).ToList() : new List<FileMapping>(),

                    };
                }

                return await GetInitializeSettingsState();
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

                return await GetInitializeSettingsState();
            }
        }

        public async Task<bool> SaveFile(HttpRequest request)
        {
            try
            {
                var dict = new Dictionary<string, string>();

                foreach (var field in request.Form)
                {
                    dict.Add(field.Key, field.Value);
                }

                var file = request.Form.Files[0] ?? null;

                if (file != null)
                {
                    using (var stream = new MemoryStream())
                    {
                        await file.CopyToAsync(stream);
                        stream.Seek(0, SeekOrigin.Begin);
                        var size = stream.Length;
                        var rawData = stream.GetBuffer();

                        var entity = new FileStorageEntity
                        {
                            FileName = dict["fileName"],
                            FileType = dict["fileType"],
                            Topic = dict["topic"],
                            Module = FileModuls.MemoryFileModules.Module,
                            Content = Convert.ToBase64String(rawData),
                            FileSize = (int)size
                        };

                        var affectedRows = await _fileStorageAccessor.AddAsync(entity, x => x.FileName == entity.FileName && x.Topic == entity.Topic);

                        return affectedRows == 1;
                    }
                }

                return false;
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Save file failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return false;
            }
            return true;
        }
        public async Task<bool> SaveOrUpdateGameSettings(GameSettingsRequestModel requestModel)
        {
            var result = false;

            try
            {
                var topicId = await GetTopicId(requestModel.Topic);

                if (topicId == -1)
                {
                    result = await TrySaveTopic(requestModel.Topic);

                    topicId = await GetTopicId(requestModel.Topic);
                }

                if (result && topicId != -1)
                {
                    result = await TrySaveGameSettings(requestModel, topicId);
                }

                return result;
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Add memory game settings failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return false;
            }
        }

        private async Task<List<KeyValueItem>> GetSettingsDropdownTopicItems()
        {
            try
            {
                var items = await GetTopicDropdownItems();

                return items.Skip(1).ToList();
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading settings dropdown items failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new List<KeyValueItem>();
            }
        }

        public async Task<List<KeyValueItem>> GetTopicDropdownItems()
        {
            try
            {
                var topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == GameTypeEnum.Memory);

                var topicDropdownItems = new List<KeyValueItem> { new KeyValueItem { Key = 0, Value = "select" } };
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

        public override async Task<MemoryPageData> GetPageData()
        {
            try
            {
                return new MemoryPageData
                {
                    TopicDropdownItems = await GetTopicDropdownItems(),
                    PlayerDropdownItems = GetPlayerDropdownItems(),
                    LevelDropdownItems = GetLevelDropdownItems(),
                    GameConfiguration = new GameConfigurationModel
                    {
                        Topic = 0,
                        DefaultLevel = 0,
                        DefaultPlayer = 0,
                        DefaultTopic = 0,
                        GameType = 0,
                        HasLevelSelection = true,
                        HasPlayerSelection = true,
                        HasTopicSelection = true,

                    }
                };
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading memory page data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new MemoryPageData();
            }
        }
        
        public async Task<FileDownload?> GetWordlistFileStream()
        {
            var resource = Properties.Resources.MemoryWordList;

            try
            {
                var assembly = Assembly.GetExecutingAssembly();
                using (var stream = assembly.GetManifestResourceStream("BusinessLogic.Games.Resources.MemoryWordList_{topic}.txt"))
                using (var memoryStream = new MemoryStream())
                {
                    if (stream != null)
                    {
                        stream.CopyTo(memoryStream);

                        return new FileDownload
                        {
                            Stream = memoryStream,
                            FileName = $"{resource}.txt"
                        };
                    }

                    throw new Exception("Could not get resource [wordlistfile].");
                }

            }
            catch
            {
                return null;

            }
        }

        private List<FileMapping> GetCardFileMappings(List<FileStorageEntity> cards)
        {
            var mappings = new List<FileMapping>();

            if (!cards.Any())
            {
                return mappings;
            }

            foreach (var card in cards)
            {
                if (card.Content.Length > 0)
                {
                    var mapping = new FileMapping
                    {
                        Key = card.Id,
                        Topic = card.Topic,

                        FileName = card.FileName,
                        FileType = card.FileType,
                        IsActive = true,
                        Buffer = Encoding.ASCII.GetBytes(card.Content)
                    };

                    mappings.Add(mapping);
                }
            }

            return mappings;
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

        private async Task<bool> TrySaveTopic(string topicName)
        {
            return await _gameTopicAccessor.AddAsync(new GameTopicEntity { GameType = GameTypeEnum.Memory, TopicName = topicName }, x => x.TopicName == topicName) == 1;
        }

        private async Task<bool> TrySaveGameSettings(GameSettingsRequestModel model, int topicId)
        {
            var gameSettings = new GameSettingsEntity
            {
                GameTypeId = GameTypeEnum.Memory,
                HasLevelSelection = model.HasLevelSelection,
                HasPlayerSelection = model.HasPlayerSelection,
                HasTopicSelection = model.HasTopicSelection,
                TopicId = topicId
            };

            return await _gameSettingsAccessor.AddAsync(gameSettings, s => s.TopicId == topicId) == 1;
        }

        private async Task<byte[]?> TryGetFileContent(IFormFile file)
        {
            using (var stream = new MemoryStream())
            {
                var content = new byte[0];

                await file.CopyToAsync(stream);

                var isBufferCreated = stream.TryGetBuffer(out var buffer);

                if (isBufferCreated)
                {
                    content = buffer.ToArray();
                    return content;
                }

                return null;
            }
        }

        private int GetWordLevel(string word)
        {
            if (word.Length <= 5)
            {
                return 1;
            }

            if (word.Length < 10)
            {
                return 2;
            }

            return 3;
        }

    }
}
