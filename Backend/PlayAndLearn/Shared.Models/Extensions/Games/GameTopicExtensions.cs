using Shared.Models.Entities;
using Shared.Models.Games;

namespace Shared.Models.Extensions.Games
{
    public static class GameTopicExtensions
    {
        public static GameTopicExportModel ToExportModel(this GameTopicEntity entity, int index)
        {
            return new GameTopicExportModel
            {
                Id = entity.Id,
                Index = index,
                GameType = entity.GameType,
                TopicName = entity.TopicName
            };
        }
    }
}
