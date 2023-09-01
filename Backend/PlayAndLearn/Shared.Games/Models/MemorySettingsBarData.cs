using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemorySettingsBarData: AGameSettingsBarData
    {
        public List<GameLevelType> GameLevelTypeItems { get; set; } = new List<GameLevelType>();
        public List<int> PairCountSelectionItems { get; set; } = new List<int>();
        public List<GameTopicExportModel> GameTopics { get; set; } = new List<GameTopicExportModel>();
    }
}
