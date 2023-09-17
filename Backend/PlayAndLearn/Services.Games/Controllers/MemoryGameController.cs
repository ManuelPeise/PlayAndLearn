using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Shared;
using Services.Shared.Authorization;
using Shared.Games.Models;
using Shared.Models;
using Shared.Models.Enums.Games;
using Shared.Models.Games;


namespace Services.Games.Controllers
{
    public class MemoryGameController : ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;
        private readonly ILogRepository _logRepository;
        public MemoryGameController(IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext, ILogRepository logRepository)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
            _logRepository = logRepository;
        }

        [HttpGet(Name = "GetPageData")]
        public async Task<MemoryPageData> GetPageData()
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetPageData();

            }
        }

        //[ApiKey(ApiKey ="", ModuleKey = "")]
        [HttpPost(Name = "GetGameData")]
        public async Task<MemoryPageData> GetGameData()
        {
            using (var reader = new StreamReader(Request.Body))
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var body = await reader.ReadToEndAsync();

                var model = JsonConvert.DeserializeObject<MemoryGameDataRequestModel>(body);

                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetGameData(model);
            }
        }

        [HttpGet(Name = "GetTopics")]
        public async Task<List<KeyValueItem>> GetTopics(string gameType)
        {
            var type = (GameTypeEnum)Enum.Parse(typeof(GameTypeEnum), gameType);

            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, type, _appDataContext))
            {
                if (type == GameTypeEnum.Memory)
                {
                    var memoryHandler = (MemoryGameHandler)handler;

                    return await memoryHandler.GetTopicDropdownItems();

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
