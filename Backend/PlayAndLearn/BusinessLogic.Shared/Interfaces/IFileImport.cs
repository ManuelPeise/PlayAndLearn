using Shared.Models.Import;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IFileImport: IDisposable
    {
        Task ImportFile(FileImportModel importModel);
    }
}
