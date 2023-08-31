using Shared.Games.Enums;

namespace Shared.Games.Models
{
    public class MemorySettings: AGameSettings
    {
        public MemoryTopicTypeEnum Topic { get; set; }
        public int CountOfPairs { get; set; }
        public List<Word> WordList { get; set; } = new List<Word>();
    }
}
