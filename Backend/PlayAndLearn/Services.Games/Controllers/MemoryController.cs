using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Mvc;
using Services.Shared;
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

        [HttpGet(Name = "GetWordList")]
        public async Task<List<WordModel>> GetWordList(GameTypeEnum gameType, GameLevelTypeEnum levelType)
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(gameType, _appDataContext))
            {
                if(gameType == GameTypeEnum.Memory)
                {
                    var memoryHandler = (MemoryGameHandler)handler;
                    return await memoryHandler.GetWordList(levelType);
                }

                return new List<WordModel>();
            }
        }

    }
}
