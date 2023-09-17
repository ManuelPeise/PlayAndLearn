using Shared.Models.Enums.Games;

namespace Shared.Models.Games
{
    public class WordModel
    {
        public GameTypeEnum GameType { get; set; }
        public int Key { get; set; }
        public string Value { get; set; } = string.Empty;
        public int LevelType { get; set; }
    }
}
