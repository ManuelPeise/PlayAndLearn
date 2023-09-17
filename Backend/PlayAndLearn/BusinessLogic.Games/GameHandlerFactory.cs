using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Models.Enums.Games;

namespace BusinessLogic.Games
{
    public class GameHandlerFactory: IGameHandlerFactory
    {
        public GameHandlerFactory()
        {

        }

        public AGameHandler GetGameHandler(ILogRepository logRepository, GameTypeEnum gameType, AppDataContext appDataContext)
        {
            switch (gameType)
            {
                case GameTypeEnum.Memory:
                    return new MemoryGameHandler(logRepository, appDataContext);
                default: 
                    throw new NotImplementedException();
            }
        }
    }
}
