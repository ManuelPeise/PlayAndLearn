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

        public GameSettingsController(IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
        }

        [HttpGet(Name = "GetSettings")]
        public async Task<AGameSettingsBarData> GetSettings(GameTypeEnum gameType)
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(gameType, _appDataContext))
            {
                return await handler.GetSettingsBarData();
            }
        }
    }
}
