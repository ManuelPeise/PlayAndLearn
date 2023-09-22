namespace Shared.Models.Games
{
    public abstract class AGameSettingsRequestModel
    {
        public string Topic { get; set; } = string.Empty;
        public bool HasPlayerSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasTopicSelection { get; set; }
    }
}
