using Shared.Models.Entities;

namespace Shared.Models.Games.Memory
{
    public class MemoryHighscoreListExport
    {
        public int Level { get; set; }
        public List<HighScore> List { get; set; }
    }
}
