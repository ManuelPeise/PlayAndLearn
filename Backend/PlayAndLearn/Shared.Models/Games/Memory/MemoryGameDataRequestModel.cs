using Shared.Models.Enums.Games;

namespace Shared.Models.Games.Memory
{
    public class MemoryGameDataRequestModel
    {
        public GameTypeEnum GameType { get; set; }
        public int SelectedTopic { get; set; }
        public int SelectedLevel { get; set; }
        public int SelectedPlayer { get; set; }
        public bool IsInitialLoad { get; set; }

    }
}
