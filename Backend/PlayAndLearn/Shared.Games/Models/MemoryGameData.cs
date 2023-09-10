using Shared.Models;
using Shared.Models.Enums.Games;
using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemoryGameData
    {
        public Guid GameId { get; set; }
        public GameTypeEnum GameType { get; set; }
        public GameLevelTypeEnum GameLevel { get; set; }
        public int Pairs { get; set; }
        public List<MemoryCardExportModel> Cards { get; set; } = new List<MemoryCardExportModel>();
        public string Error { get; set; } = string.Empty;
    }

   
}
