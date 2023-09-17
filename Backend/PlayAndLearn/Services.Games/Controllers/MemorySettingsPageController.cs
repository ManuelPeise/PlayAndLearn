using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Services.Shared;
using Shared.Models;
using Shared.Models.Enums.Games;
using Shared.Models.Export;
using Shared.Models.Games;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Sockets;

namespace Services.Games.Controllers
{
    public class MemorySettingsPageController : ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;
        private readonly ILogRepository _logRepository;

        public MemorySettingsPageController(ILogRepository logRepository, IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext)
        {
            _gameHandlerFactory = gameHandlerFactory;
            _appDataContext = appDataContext;
            _logRepository = logRepository;
        }

        [HttpGet(Name = "GetInitialSate")]
        public async Task<GameSettings> GetInitialSate()
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetInitializeSettingsState();

            }
        }

        [HttpGet("{topic}", Name = "GetMemorySettings")]
        public async Task<GameSettings> GetMemorySettings(string topic)
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.GetGameSettings(topic);

            }
        }
        [HttpGet(Name = "GetWordlistTemplate")]
        public async Task<FileContentResult?> GetWordlistTemplate()
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                try
                {
                    var memoryHandler = (MemoryGameHandler)handler;

                    var fileDownloadData = await memoryHandler.GetWordlistFileStream();

                    var content = fileDownloadData.Stream.ToArray();

                    if (content != null)
                    {
                        return File(content, "binary/octet-stream", "MemoryWordList_{topic}.txt");
                    }

                }catch (Exception ex)
                {
                    var msg = ex.Message;

                }
                return null;
            }
        }
    }
}
