using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class GameTopicEntity : EntityBase
    {
        public string TopicName { get; set; } = string.Empty;
        public GameTypeEnum GameType { get; set; }

    }
}
