using Shared.Models;
using Shared.Models.Entities;
using Shared.Models.Games.Memory;
using Shared.Models.Import;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IMemory: IDisposable
    {
        Task<MemorySettings> GetSettingsBarData();
        Task<List<MemoryFileMapping>> GetMemoryCards(int topic);
        Task<List<MemoryHighscoreListExport>> GetHighscoreList();
        Task StoreHighscore(HighScore highscore);
        Task StoreTopic(TopicImportModel importModel);
        Task<List<KeyValueItem>> GetTopicItems();
    }
}
