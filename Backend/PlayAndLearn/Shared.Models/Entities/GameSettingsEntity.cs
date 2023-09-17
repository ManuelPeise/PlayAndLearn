using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class GameSettingsEntity: EntityBase
    {
        public GameTypeEnum GameTypeId { get; set; }
        public int TopicId { get; set; }
        public bool HasTopicSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasPlayerSelection { get; set; }
    }
}
