namespace Shared.Models.Games.Memory
{
    public class MemoryFileMapping
    {
        public int Key { get; set; }
        public string FileType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Color { get; set; } = string.Empty;
        public string Buffer { get; set; } = string.Empty;
    }
}
