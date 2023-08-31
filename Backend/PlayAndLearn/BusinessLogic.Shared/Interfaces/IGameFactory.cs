using Shared.Games.Interfaces;
using Shared.Games.Models;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IGameFactory : IDisposable
    {
        Task<AGameSettings> GetSettings(IGameSettings settings);
    }
}
