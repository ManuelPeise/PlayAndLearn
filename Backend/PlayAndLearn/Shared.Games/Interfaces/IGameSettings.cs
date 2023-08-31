using Shared.Games.Enums;

namespace Shared.Games.Interfaces
{
    public interface IGameSettings
    {
        public GameTypeEnum GameType { get; set; }
        public bool isInitialisation { get; set; }

        // memory
        public int CountOfPairs { get; set; }
        public MemoryTopicTypeEnum MemoryTopic { get; set; }
        public int MaxLetterCount { get; set; }
    }
}
