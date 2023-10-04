using Microsoft.AspNetCore.Http;

namespace Shared.Models.Import
{
    public class FileImportModel
    {
        public string Topic { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string Module { get; set; } = string.Empty;
        public IFormFile File { get; set; }
    }
}
