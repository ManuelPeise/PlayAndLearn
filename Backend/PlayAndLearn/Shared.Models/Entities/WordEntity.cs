using Shared.Models.Enums.Games;

namespace Shared.Models.Entities
{
    public class WordEntity: EntityBase
    {
        public string Value { get; set; } = string.Empty;
        public GameLevelTypeEnum LevelType { get; set; }
    }
}
