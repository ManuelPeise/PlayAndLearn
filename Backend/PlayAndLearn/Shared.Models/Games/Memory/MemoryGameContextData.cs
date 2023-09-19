namespace Shared.Models.Games.Memory
{
    public class MemoryGameContextData
    {
        public MemoryGameConfiguration GameConfiguration { get; set; } = new MemoryGameConfiguration();
        public List<KeyValueItem> LevelItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> TopicItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerItems { get; set; } = new List<KeyValueItem>();
        public List<MemoryFileMapping> Cards { get; set; } = new List<MemoryFileMapping>();
    }
}
