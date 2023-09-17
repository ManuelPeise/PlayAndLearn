namespace Shared.Models.Export
{
    public class FileDownload
    {
        public string FileName { get; set; }
        public MemoryStream Stream { get; set; }
    }
}
