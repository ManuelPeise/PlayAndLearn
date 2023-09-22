namespace Shared.Models.Games.Memory
{
    public class MemoryGameSettings: AGameSettings
    {
        public string Topic { get; set; } = string.Empty;
        public string TopicFallbackValue { get; set; } = string.Empty;
        public bool HasPlayerSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasTopicSelection { get; set; }
        public List<MemoryFileMapping> Files { get; set; } = new List<MemoryFileMapping>();
    }
}
