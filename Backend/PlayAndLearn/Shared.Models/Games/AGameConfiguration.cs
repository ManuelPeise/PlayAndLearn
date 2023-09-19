using Shared.Models.Enums.Games;

namespace Shared.Models.Games
{
    public abstract class AGameConfiguration
    {
        public GameTypeEnum GameType { get; set; }
        public string Topic { get; set; } = string.Empty;
        public bool HasTopicSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasPlayerSelection { get; set; }
        public int SelectedTopic { get; set; }
        public int SelectedLevel { get; set; }
        public int SelectedPlayer { get; set; }
    }
}
