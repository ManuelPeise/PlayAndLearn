using Shared.Models.Enums;
using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class GameTopicEntity : EntityBase
    {
        public string TopicName { get; set; } = string.Empty;
        public TopicTypeEnum TopicType { get; set; }
        public GameTypeEnum GameType { get; set; }

    }
}
