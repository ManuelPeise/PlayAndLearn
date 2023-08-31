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

        public AGameHandler GetGameHandler(GameTypeEnum gameType, AppDataContext appDataContext)
        {
            switch (gameType)
            {
                case GameTypeEnum.Memory:
                    return new MemoryGameHandler(appDataContext);
                default: 
                    throw new NotImplementedException();
            }
        }
    }
}
