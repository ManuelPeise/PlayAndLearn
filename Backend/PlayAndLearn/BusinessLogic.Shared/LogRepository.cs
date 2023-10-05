using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Shared
{
    public class LogRepository : ILogRepository
    {
        private bool disposedValue;

        private readonly AppDataContext _context;
        private readonly GenericDbContextAccessor<LogMessageEntity> _contextAccessor;

        public LogRepository(AppDataContext context)
        {
            _context = context;
            _contextAccessor = new GenericDbContextAccessor<LogMessageEntity>(context);
        }

        public async Task AddLogMessage(LogMessageEntity entity)
        {
            await _contextAccessor.AddAsync(entity, x => x.Key == entity.Key);
        }

        public async Task<bool> DeleteLogMessages(DateTime maxValue)
        {
            try
            {
                var mesages = await _contextAccessor.GetEntitiesAsync(x => x.TimeStamp < maxValue);

                foreach (var msg in mesages)
                {
                    await _contextAccessor.DeleteEntityAsync(msg, x => x.TimeStamp == msg.TimeStamp);
                }

                return true;
            }
            catch (Exception exception)
            {
                var msgKey = Guid.NewGuid();

                var logMessage = new LogMessageEntity
                {
                    Key = msgKey,
                    Message = "Cleanup log table failed!",
                    ExMessage = exception.Message,
                    Stacktrace = exception.StackTrace ?? string.Empty,
                    Module = "Logging",
                    TimeStamp = DateTime.UtcNow
                };

                await _contextAccessor.AddAsync(logMessage, x => x.Key == msgKey);

                return false;
            }
        }

        public async Task<List<LogMessageEntity>> GetLogmessages()
        {
            return await _contextAccessor.GetAllEntitiesAsync();
        }

        #region dispose

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                    _contextAccessor.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
