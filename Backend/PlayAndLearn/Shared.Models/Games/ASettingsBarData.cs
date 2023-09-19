namespace Shared.Models.Games
{
    public abstract class ASettingsBarData
    {
        public string TitleKey { get; set; } = string.Empty;
        public List<KeyValueItem> LevelDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> TopicDropdownItems { get; set; } = new List<KeyValueItem>();
        public List<KeyValueItem> PlayerDropdownItems { get; set; } = new List<KeyValueItem>();
    }
}
