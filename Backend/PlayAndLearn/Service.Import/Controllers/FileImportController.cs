using BusinessLogic.Shared.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models.Import;

namespace Service.Import.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class FileImportController: ControllerBase
    {
        private IFileImport _fileImport;

        public FileImportController(IFileImport fileImport)
        {
            _fileImport = fileImport;
        }

        [HttpPost(Name = "ImportFile")]
        public async Task ImportFile([FromForm]FileImportModel importModel)
        {
            await _fileImport.ImportFile(importModel);
        }
    }
}
