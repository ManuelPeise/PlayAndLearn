namespace Shared.Models.Entities
{
    public class FileStorageEntity: EntityBase
    {
        public string Module { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileSize { get; set; }
        public string Content { get; set; } = string.Empty;


    }
}
