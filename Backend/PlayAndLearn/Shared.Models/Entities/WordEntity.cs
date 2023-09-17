using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class WordEntity: EntityBase
    {
        public string Value { get; set; } = string.Empty;
        public int Level { get; set; }
        public GameTypeEnum GameType { get; set; }
    }
}
