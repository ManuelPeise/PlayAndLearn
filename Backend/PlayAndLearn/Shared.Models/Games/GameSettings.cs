using Microsoft.AspNetCore.Http;

namespace Shared.Models.Games
{
    public class GameSettings
    {
        public string Topic { get; set; } = string.Empty;
        public string TopicFallbackValue { get; set; } = string.Empty;
        public bool HasPlayerSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasTopicSelection { get; set; }
        public List<KeyValueItem> Topics { get; set; } = new List<KeyValueItem>();
        public List<FileMapping> Files { get; set; } = new List<FileMapping>();
    }

    public class GameSettingsRequestModel
    {
        public string Topic { get; set; } = string.Empty;
        public bool HasPlayerSelection { get; set; }
        public bool HasLevelSelection { get; set; }
        public bool HasTopicSelection { get; set; }
    }

    public class FileMapping
    {
        public int Key { get; set; }
        public IFormFile? File { get; set; }
        public string FileType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Color { get; set; } = string.Empty;
        public byte[] Buffer { get; set; }
    }
}
