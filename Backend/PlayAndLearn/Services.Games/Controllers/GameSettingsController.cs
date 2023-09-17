using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Mvc;
using Services.Shared;
using Shared.Games.Models;
using Shared.Models.Enums.Games;

namespace Services.Games.Controllers
{
    public class GameSettingsController: ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;
        private readonly ILogRepository _logRepository;

        public GameSettingsController(IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext, ILogRepository logRepository)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
            _logRepository = logRepository;
        }

        [HttpGet(Name = "GetSettings")]
        public async Task<AGameSettingsBarData> GetSettings(GameTypeEnum gameType)
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, gameType, _appDataContext))
            {
                return await handler.GetSettingsBarData();
            }
        }
    }
}
