using Shared.Games.Enums;

namespace Shared.Games.Models
{
    public abstract class AGameSettings
    {
        public GameTypeEnum GameType { get; set; }
        public string GameName { get; set; } = string.Empty;
    }
}
