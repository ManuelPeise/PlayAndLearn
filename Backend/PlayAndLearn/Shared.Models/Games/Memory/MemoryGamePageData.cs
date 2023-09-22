using System;
namespace Shared.Models.Games.Memory
{
    public class MemoryGamePageData
    {
        public List<KeyValueItem> TopicDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> LevelDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerDropdownItems { get; set; } = new List<KeyValueItem>();
        public MemoryGameConfiguration GameConfiguration { get; set; } = new MemoryGameConfiguration();
        public MemoryGameData GameData { get; set; }
    }


    public class MemoryGameData
    {
        public Guid GameId { get; set; }
        public string Error { get; set; } = string.Empty;
    }
}
