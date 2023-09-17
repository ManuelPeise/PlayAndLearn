﻿using BusinessLogic.Games;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Shared;
using Shared.Models.Enums.Games;
using Shared.Models.Games;


namespace Services.Games.Controllers
{
    public class MemoryGameUploadController : ApiControllerBase
    {
        private readonly IGameHandlerFactory _gameHandlerFactory;
        private readonly AppDataContext _appDataContext;
        private readonly IHostingEnvironment _env;
        private readonly ILogRepository _logRepository;

        public MemoryGameUploadController(ILogRepository logRepository, IHostingEnvironment env, IGameHandlerFactory gameHandlerFactory, AppDataContext appDataContext)
        {
            _env = env;
            _appDataContext = appDataContext;
            _gameHandlerFactory = gameHandlerFactory;
            _logRepository = logRepository;

        }

        //TODO check this mabe send single files
        [HttpPost(Name = "UpLoadGameSettings")]
        public async Task<bool> SaveOrUpdateGameSettings()
        {
            using (var reader = new StreamReader(Request.Body))
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var body = await reader.ReadToEndAsync();

                var model = JsonConvert.DeserializeObject<GameSettingsRequestModel>(body);

                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.SaveOrUpdateGameSettings(model);
            }
        }

        [HttpPost(Name = "UploadMemoryFile")]
        public async Task<bool> UploadMemoryFile()
        {
            using (var handler = _gameHandlerFactory.GetGameHandler(_logRepository, GameTypeEnum.Memory, _appDataContext))
            {
                var memoryHandler = (MemoryGameHandler)handler;
                return await memoryHandler.SaveFile(Request);

            }
        }
    }
}
