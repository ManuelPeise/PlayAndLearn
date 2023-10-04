using BusinessLogic.Shared.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Games.Memory;
using Shared.Models.Import;

namespace Services.Games.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class MemoryController: ControllerBase
    {
        private readonly IMemory _memory;

        public MemoryController(IMemory memory)
        {
            _memory = memory;
        }

        [HttpGet(Name = "GetSettingsBarData")]
        public async Task<MemorySettings> GetSettingsBarData()
        {
            return await _memory.GetSettingsBarData();
        }

        [HttpGet(Name = "GetMemoryCards")]
        public async Task<List<MemoryFileMapping>> GetMemoryCards([FromQuery] int topicId)
        {
            return await _memory.GetMemoryCards(topicId);
        }

        [HttpGet(Name = "GetMemoryHighscore")]
        public async Task<List<MemoryHighscoreListExport>> GetMemoryHighscore()
        {
            return await _memory.GetHighscoreList();
        }

        [HttpGet(Name = "GetTopics")]
        public async Task<List<KeyValueItem>> GetTopics()
        {
            return await _memory.GetTopicItems();
        }

        [HttpPost(Name = "SaveHighscore")]
        public async Task SaveHighscore([FromBody]HighScore highscore)
        {
            await _memory.StoreHighscore(highscore);
        }

        [HttpPost(Name = "ImportTopic")]
        public async Task ImportTopic([FromBody]TopicImportModel importModel)
        {
            await _memory.StoreTopic(importModel);
        }

        
    }
}
