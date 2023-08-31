using Shared.Models.Games;

namespace Shared.Games.Models
{
    public class MemorySettingsBarData: AGameSettingsBarData
    {
        public List<GameTopicExportModel> GameTopics { get; set; } = new List<GameTopicExportModel>();
    }
}
