using Shared.Models.Enums;
using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class MemoryCardEntity: EntityBase
    {
        public string Name { get; set; } = string.Empty;
        public byte[] Image { get; set; }
        public GameTypeEnum GameType { get; set; }
        public int TopicId { get; set; }
        public bool IsBackgroundImage  { get; set; }
    }
}
