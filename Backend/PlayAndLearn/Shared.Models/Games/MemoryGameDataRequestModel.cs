using Shared.Models.Enums.Games;

namespace Shared.Models.Games
{
    public class MemoryGameDataRequestModel
    {
        public GameLevelTypeEnum GameLevel { get; set; }
        public GameTypeEnum GameType { get; set; }
        public int TopicId { get; set; }
    }
}
