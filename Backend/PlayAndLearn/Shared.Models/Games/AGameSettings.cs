namespace Shared.Models.Games
{
    public abstract class AGameSettings
    {
        public List<KeyValueItem> TopicItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> LevelItems { get; set; } = new List<KeyValueItem>();
    }
}
