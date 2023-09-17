using Shared.Models.Entities;
using Shared.Models.Games;

namespace Shared.Models.Extensions.Games
{
    public static class GameConfigurationExtensions
    {
        public static GameSettingsEntity ToEntity(this GameConfigurationModel model)
        {
            return new GameSettingsEntity
            {
                HasLevelSelection = model.HasLevelSelection,
                HasPlayerSelection = model.HasPlayerSelection,
                HasTopicSelection = model.HasTopicSelection,
                GameTypeId = model.GameType,
                TopicId = model.Topic,
            };
        }
    }
}
