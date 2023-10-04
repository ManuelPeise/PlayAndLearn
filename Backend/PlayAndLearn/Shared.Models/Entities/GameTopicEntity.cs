using Shared.Models.Enums.Import;

namespace Shared.Models.Entities
{
    public class GameTopicEntity : EntityBase
    {
        public string TopicName { get; set; } = string.Empty;
        public TopicTypeEnum TopicType { get; set; }

    }
}
