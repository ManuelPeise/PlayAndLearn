using Shared.Models.Entities;

namespace BusinessLogic.Shared.Interfaces
{
    public interface ILogRepository: IDisposable
    {
        Task AddLogMessage(LogMessageEntity entity);
        Task<List<LogMessageEntity>> GetLogmessages();
        Task<bool> DeleteLogMessages(DateTime maxValue);
    }
}
