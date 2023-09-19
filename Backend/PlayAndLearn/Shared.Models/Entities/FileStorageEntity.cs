using System.Reflection.Metadata;

namespace Shared.Models.Entities
{
    public class FileStorageEntity: EntityBase
    {
        public string Module { get; set; }
        public string Topic { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int FileSize { get; set; }

        public string Content { get; set; }

       
    }
}
