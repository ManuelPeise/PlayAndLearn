using Shared.Models;

namespace Shared.Games.Models
{
    public class MemoryPageData
    {
        public List<KeyValueItem> Topics { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> Levels { get; set; } = new List<KeyValueItem>();
    }
}
