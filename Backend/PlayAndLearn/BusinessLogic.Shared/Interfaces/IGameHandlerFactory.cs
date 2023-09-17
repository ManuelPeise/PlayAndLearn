using Data.AppData;
using Shared.Models.Enums.Games;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IGameHandlerFactory
    {
        AGameHandler GetGameHandler(ILogRepository _logRepository, GameTypeEnum gameType, AppDataContext appDataContext);
    }
}
