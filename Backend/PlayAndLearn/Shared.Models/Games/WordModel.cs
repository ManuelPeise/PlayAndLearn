using Shared.Models.Enums.Games;

namespace Shared.Models.Games
{
    public class WordModel
    {
        public int Key { get; set; }
        public string Value { get; set; } = string.Empty;
        public GameLevelTypeEnum LevelType { get; set; }
    }
}
