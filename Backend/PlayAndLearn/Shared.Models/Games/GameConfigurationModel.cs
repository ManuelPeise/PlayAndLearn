using Shared.Models.Enums.Games;

namespace Shared.Models.Games
{
    public class GameConfigurationModel
    {
        public GameTypeEnum GameType { get; set; }
        public int Topic { get; set; }
        public bool HasTopicSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasPlayerSelection { get; set; }
        public int DefaultTopic { get; set; }
        public int DefaultLevel { get; set; }
        public int DefaultPlayer { get; set; }
    }
}
