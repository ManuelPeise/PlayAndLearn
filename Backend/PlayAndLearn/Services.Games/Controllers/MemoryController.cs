using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Shared;
using Shared.Games.Models;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Enums;
using Shared.Models.Enums.Games;
using Shared.Models.Games;


namespace Services.Games.Controllers
{
    public class MemoryController : ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;

        public MemoryController(IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
        }

        [HttpGet(Name = "GetPageData")]
        public async Task<MemoryPageData> GetPageData()
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(GameTypeEnum.Memory, _appDataContext))
            {
                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetPageData();

            }
        }

        [HttpGet(Name = "GetGameData")]
        public async Task<MemoryGameData> GetGameData(string gameType, string gameLevel, int topicId)
        {
            var type = (GameTypeEnum)Enum.Parse(typeof(GameTypeEnum), gameType);

            using (var handler = _gameHandlerFactory.GetGameHandler(type, _appDataContext))
            {
                var level = (GameLevelTypeEnum)Enum.Parse(typeof(GameLevelTypeEnum), gameLevel);

                if (type == GameTypeEnum.Memory)
                {
                    var memoryHandler = (MemoryGameHandler)handler;
                    return await memoryHandler.GetGameData(new MemoryGameDataRequestModel { GameType = type, GameLevel = level, TopicId = topicId });
                }

                return new MemoryGameData { GameId = Guid.NewGuid(), GameLevel = level, GameType = type, Error = "Found unknown game type!" };
            }
        }

        [HttpGet(Name = "GetTopics")]
        public async Task<List<KeyValueItem>> GetTopics(string gameType)
        {
            var type = (GameTypeEnum)Enum.Parse(typeof(GameTypeEnum), gameType);

            using (var handler = _gameHandlerFactory.GetGameHandler(type, _appDataContext))
            {
                if (type == GameTypeEnum.Memory)
                {
                    var memoryHandler = (MemoryGameHandler)handler;

                    return await memoryHandler.GetTopics();

                }

                return new List<KeyValueItem>();
            }
        }

        [HttpGet(Name = "GetFile")]
        public async Task<FileStreamResult> GetFile()
        {
            var filePath = Path.Combine(Path.GetTempPath(), "testfile.csv");

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            var stream = System.IO.File.Create(filePath);

            if (stream != null)
            {
                return File(stream, "application/octet-stream", "Ttestfile.csv");
            }


            return null;
        }
    }
}
