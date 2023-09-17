using Shared.Models;
using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemoryPageData
    {
        public List<KeyValueItem> TopicDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> LevelDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerDropdownItems { get; set; } = new List<KeyValueItem>();
        public GameConfigurationModel GameConfiguration { get; set; }
        public MemoryGameData GameData { get; set; }
    }
}
