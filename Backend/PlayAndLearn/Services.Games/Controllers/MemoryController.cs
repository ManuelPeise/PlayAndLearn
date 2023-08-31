using BusinessLogic.Shared.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Services.Shared;
using Shared.Games.Interfaces;
using Shared.Games.Models;

namespace Services.Games.Controllers
{
    public class MemoryController : ApiControllerBase
    {
        private readonly IGameFactory _gameFactory;

        public MemoryController(IGameFactory gameFactory)
        {
            _gameFactory = gameFactory;
        }

        [HttpGet(Name = "GetMemorySettings")]
        public async Task<AGameSettings> GetMemorySettings(IGameSettings settings)
        {
            return await _gameFactory.GetSettings(settings);
        }

        [HttpGet(Name = "GetImages")]
        public async Task GetImages()
        {
            throw new NotImplementedException();
        }

    }
}
