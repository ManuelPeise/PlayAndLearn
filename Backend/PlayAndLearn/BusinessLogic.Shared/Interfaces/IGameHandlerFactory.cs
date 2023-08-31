using Data.AppData;
using Shared.Models.Enums.Games;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IGameHandlerFactory
    {
        AGameHandler GetGameHandler(GameTypeEnum gameType, AppDataContext appDataContext);
    }
}
