using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Http;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Enums.Games;
using Shared.Models.Export;
using Shared.Models.Games;
using Shared.Models.Games.Memory;
using System.Reflection;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace BusinessLogic.Games
{
    public class MemoryGameHandler : AGameHandler
    {
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;
        private IGenericDbContextAccessor<GameSettingsEntity> _gameSettingsAccessor;
        private IGenericDbContextAccessor<FileStorageEntity> _fileStorageAccessor;
        private ILogRepository _logRepository;

        public MemoryGameHandler(ILogRepository logRepository, AppDataContext appDataContext) : base(appDataContext, logRepository)
        {
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _gameSettingsAccessor = new GenericDbContextAccessor<GameSettingsEntity>(appDataContext);
            _fileStorageAccessor = new GenericDbContextAccessor<FileStorageEntity>(appDataContext);
            _logRepository = logRepository;
        }

        public override async Task<ASettingsBarData> GetSettingsBarData()
        {
            try
            {
                return new MemorySettingsBarData
                {
                    TitleKey = "memoryPageTitle",
                    LevelDropdownItems = GetLevelDropdownItems(),
                    PlayerDropdownItems = GetPlayerDropdownItems(),
                    TopicDropdownItems = await GetTopicDropdownItems(GameTypeEnum.Memory)
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
                    TitleKey = "memoryPageTitle",
                };
            }
        }
        public async Task<MemoryGameSettings> GetInitializeSettingsState()
        {
            return new MemoryGameSettings
            {
                Files = new List<MemoryFileMapping>(),
                HasLevelSelection = false,
                HasPlayerSelection = false,
                HasTopicSelection = true,
                Topic = string.Empty,
                TopicFallbackValue = string.Empty,
                TopicItems = await GetTopicDropdownItems(GameTypeEnum.Memory),
                LevelItems = GetLevelDropdownItems(),
                PlayerItems = GetPlayerDropdownItems()

            };
        }
        public async Task<MemoryGameSettings> GetGameSettings(string topicName)
        {
            try
            {
                var topicId = await GetTopicId(topicName);

                if (topicId != -1)
                {
                    var settings = await _gameSettingsAccessor.GetEntityAsync(x => x.TopicId == topicId);
                    var files = await _fileStorageAccessor.GetEntitiesAsync(x => x.Module == FileModuls.MemoryFileModules.Module && x.Topic == topicName);

                    return new MemoryGameSettings
                    {
                        HasLevelSelection = settings.HasLevelSelection,
                        HasPlayerSelection = settings.HasPlayerSelection,
                        HasTopicSelection = settings.HasTopicSelection,
                        Topic = topicName,
                        TopicFallbackValue = topicName,
                        TopicItems = await GetSettingsDropdownTopicItems(),
                        PlayerItems = GetPlayerDropdownItems(),
                        LevelItems = GetLevelDropdownItems(),
                        Files = files.Any() ? GetCardFileMappings(files).ToList() : new List<MemoryFileMapping>(),

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
        public async Task<bool> SaveOrUpdateGameSettings(MemoryGameSettingsRequestModel requestModel)
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
        public async Task<MemoryGameContextData> GetMemoryPageData()
        {
            return new MemoryGameContextData
            {
                GameConfiguration = new MemoryGameConfiguration
                {
                    SelectedLevel = 0,
                    SelectedPlayer = 0,
                    SelectedTopic = 0,
                    GameType = GameTypeEnum.Memory,
                    HasLevelSelection = false,
                    HasPlayerSelection = false,
                    HasTopicSelection = true,
                    Topic = "",

                },
                TopicItems = await GetTopicDropdownItems(GameTypeEnum.Memory),
                LevelItems = GetLevelDropdownItems(),
                PlayerItems = GetPlayerDropdownItems(),

            };
        }
        public async Task<MemoryGameContextData?> GetMemoryPageData(MemoryGameDataRequestModel requestModel)
        {
            try
            {
                return new MemoryGameContextData
                {
                    GameConfiguration = new MemoryGameConfiguration
                    {
                        SelectedLevel = requestModel.SelectedLevel,
                        SelectedPlayer = requestModel.SelectedPlayer,
                        SelectedTopic = requestModel.SelectedTopic,
                        GameType = GameTypeEnum.Memory,
                        HasLevelSelection = requestModel.IsInitialLoad ? false : true,
                        HasPlayerSelection = requestModel.IsInitialLoad ? false : false,
                        HasTopicSelection = true,
                        Topic = "",

                    },
                    TopicItems = await GetTopicDropdownItems(GameTypeEnum.Memory),
                    LevelItems = GetLevelDropdownItems(),
                    PlayerItems = GetPlayerDropdownItems(),
                    Cards = await GetCards(requestModel.SelectedLevel, requestModel.SelectedTopic)
                };

            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Get memory page data failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return null;
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
        private async Task<bool> TrySaveGameSettings(MemoryGameSettingsRequestModel model, int topicId)
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
        private async Task<List<KeyValueItem>> GetSettingsDropdownTopicItems()
        {
            try
            {
                var items = await GetTopicDropdownItems(GameTypeEnum.Memory);

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

        private List<MemoryFileMapping> GetFileMappingsToExport(List<MemoryFileMapping> cards, int cardsCount)
        {
            var availableCardIds = cards.Select(x => x.Key).ToList();

            var cardIds = new List<int>();

            var maxCards = Math.Min(availableCardIds.Count, cardsCount);

            var random = new Random();

            do
            {
                var randomNumber = random.Next(1, availableCardIds.Count - 1);

                if (!cardIds.Contains(randomNumber))
                {
                    cardIds.Add(randomNumber);
                }

            } while (cardIds.Count > maxCards);

            return cards.Where(x => cardIds.Contains(x.Key)).ToList();
        }

        private List<MemoryFileMapping> GetCardFileMappings(List<FileStorageEntity> cards, int cardsCount = 0)
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
                    FileType = card.FileType,
                    IsActive = true,
                    Buffer = card.Content,
                };

                mappings.Add(mapping);

            }

            if (cardsCount == 0)
            {
                return mappings;
            }

            return GetFileMappingsToExport(mappings, cardsCount);
        }
        private async Task<List<MemoryFileMapping>> GetCards(int level, int topicId)
        {
            try
            {
                var topic = await _gameTopicAccessor.GetEntityAsync(topic => topic.Id == topicId);

                if (topic == null)
                {
                    throw new Exception($"Could not load cards for topic: [{topicId}].");
                }

                var files = await _fileStorageAccessor.GetEntitiesAsync(x => x.Topic == topic.TopicName);

                if (!files.Any())
                {
                    throw new Exception($"Could not load cards for topic: [{topic.TopicName}].");
                }

                switch (level)
                {
                    case 1: return GetCardFileMappings(files, 4);
                    case 2: return GetCardFileMappings(files, 6);
                    case 3: return GetCardFileMappings(files, 12);
                    default: return GetCardFileMappings(files, 0);
                }
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Loading memory cards faild!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);

                return new List<MemoryFileMapping>();
            }

        }

        private byte[] FileToByteArray(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                return ms.ToArray();
            }

        }

    }
}
