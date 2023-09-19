using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Shared;
using Shared.Models;
using Shared.Models.Enums.Games;
using Shared.Models.Games.Memory;

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

        //[HttpGet(Name = "GetMemoryGamePageData")]
        //public async Task<MemoryGameContextData> GetMemoryGamePageData()
        //{
        //    using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
        //    {
        //        var memoryHandler = (MemoryGameHandler)handler;
        //        return await memoryHandler.GetMemoryPageData();
        //    }
        //}

        [HttpPost(Name = "GetMemoryGamePageData")]
        public async Task<MemoryGameContextData?> GetMemoryGamePageData()
        {
            using (var reader = new StreamReader(Request.Body))
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var body = await reader.ReadToEndAsync();

                var requestModel = JsonConvert.DeserializeObject<MemoryGameDataRequestModel>(body);

                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetMemoryPageData(requestModel);

            }
        }

        ////[ApiKey(ApiKey ="", ModuleKey = "")]
        //[HttpPost(Name = "GetGameData")]
        //public async Task<MemoryGamePageData> GetGameData()
        //{
        //    using (var reader = new StreamReader(Request.Body))
        //    using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
        //    {
        //        var body = await reader.ReadToEndAsync();

        //        var model = JsonConvert.DeserializeObject<MemoryGameDataRequestModel>(body);

        //        var memoryHandler = (MemoryGameHandler)handler;
        //        return await memoryHandler.GetGameData(model);
        //    }
        //}

        //[HttpGet(Name = "GetTopics")]
        //public async Task<List<KeyValueItem>> GetTopics(string gameType)
        //{
        //    var type = (GameTypeEnum)Enum.Parse(typeof(GameTypeEnum), gameType);

        //    using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, type, _appDataContext))
        //    {
        //        if (type == GameTypeEnum.Memory)
        //        {
        //            var memoryHandler = (MemoryGameHandler)handler;

        //            return await memoryHandler.GetTopicDropdownItems();

        //        }

        //        return new List<KeyValueItem>();
        //    }
        //}

     
    }
}
