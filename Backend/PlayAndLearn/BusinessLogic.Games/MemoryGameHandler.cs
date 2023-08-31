using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Games.Models;
using Shared.Models.Entities;
using Shared.Models.Enums.Games;
using Shared.Models.Extensions.Games;

namespace BusinessLogic.Games
{
    public class MemoryGameHandler : AGameHandler
    {
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;

        public MemoryGameHandler(AppDataContext appDataContext) : base(appDataContext)
        {
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
        }

        public override async Task<AGameSettingsBarData> GetSettingsBarData()
        {
            var topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == GameTypeEnum.Memory);

            var index = 0;

            return new MemorySettingsBarData
            {
                Title = "Memory",
                GameTopics = (from topic in topics
                              select topic.ToExportModel(index++))
                              .ToList()
            };
        }
    }
}
