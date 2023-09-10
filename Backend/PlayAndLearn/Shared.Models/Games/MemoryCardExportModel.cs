namespace Shared.Models.Games
{
    public class MemoryCardExportModel
    {
        public Guid Key { get; set; }
        public List<byte> Background { get; set; } = new List<byte>();
        public List<byte> Foreground { get; set; } = new List<byte>();
        public bool Disabled { get; set; }
    }
}
