using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Shared;
using Shared.Models.Enums.Games;
using Shared.Models.Games.Memory;

namespace Services.Games.Controllers
{
    public class MemoryAiController: ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;
        private readonly ILogRepository _logRepository;

        public MemoryAiController(IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext, ILogRepository logRepository)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
            _logRepository = logRepository;
        }

        [HttpPost(Name = "SaveMemoryTrainingsData")]
        public async Task SaveMemoryTrainingsData()
        {
            using (var reader = new StreamReader(Request.Body))
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var body = await reader.ReadToEndAsync();

                var requestModel = JsonConvert.DeserializeObject<MemoryTrainingsDataImportModel>(body);

                var memoryHandler = (MemoryGameHandler)handler;
               
                await memoryHandler.SaveMemoryTrainingsData(requestModel);

            }
        }
    }
}
