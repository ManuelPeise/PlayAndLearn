using Shared.Models;
using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemorySettingsBarData: AGameSettingsBarData
    {
        public List<KeyValueItem> GameLevelTypeItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> GameTopics { get; set; } = new List<KeyValueItem>();
    }
}
