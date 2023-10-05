using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Models.Entities;
using Shared.Models.Import;

namespace BusinessLogic.Import
{
    public class FileImport: IFileImport
    {
        private IGenericDbContextAccessor<FileStorageEntity> _fileStorageAccessor;
        private ILogRepository _logRepository;
        private bool disposedValue;

        public FileImport(ILogRepository logRepository, AppDataContext appDataContext)
        {
            _logRepository = logRepository;
            _fileStorageAccessor = new GenericDbContextAccessor<FileStorageEntity>(appDataContext);
        }

        public async Task ImportFile(FileImportModel importModel)
        {
            try
            {
                if (importModel.File != null)
                {
                    using (var stream = new MemoryStream())
                    {
                        await importModel.File.CopyToAsync(stream);

                        var size = stream.Length;
                        var rawData = stream.GetBuffer();

                        var entity = new FileStorageEntity
                        {
                            FileName = importModel.FileName,
                            Topic = importModel.Topic,
                            Module = importModel.Module,
                            Content = Convert.ToBase64String(rawData),
                            FileSize = (int)size
                        };

                        await _fileStorageAccessor.AddAsync(entity, x => x.FileName == entity.FileName && x.Topic == entity.Topic);
                    }
                }
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = $"Import file for {importModel.Module} failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Memory",
                    TimeStamp = DateTime.UtcNow
                };

                await _logRepository.AddLogMessage(logMessage);
            }
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _fileStorageAccessor.Dispose();
                    _logRepository.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
