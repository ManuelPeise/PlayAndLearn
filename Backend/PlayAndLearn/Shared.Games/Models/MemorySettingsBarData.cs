using Shared.Models;
using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemorySettingsBarData: AGameSettingsBarData
    {
        public List<KeyValueItem> LevelDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> TopicDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerDropdownItems { get; set; } = new List<KeyValueItem>();
    }
}
