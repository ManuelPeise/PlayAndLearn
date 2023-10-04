using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.EntityFrameworkCore;
using Shared.Models.Entities;

namespace BusinessLogic.Administration
{
    public class DatabaseMigrator: IDatabaseMigrator
    {
        private readonly AppDataContext _appDataContext;
        private readonly ILogRepository _logRepository;
        private bool disposedValue;

        public DatabaseMigrator(ILogRepository logRepository, AppDataContext context)
        {
            _appDataContext = context;
            _logRepository = logRepository;
        }

        public async Task MigrateDatabase()
        {
            try
            {
                var pendingMigrations = await _appDataContext.Database.GetPendingMigrationsAsync();

                if (pendingMigrations.Any())
                {
                    _appDataContext.Database.Migrate();
                }


            }catch(Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Could not migrate database!",
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
                    _appDataContext?.Dispose();
                    _logRepository?.Dispose();
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
