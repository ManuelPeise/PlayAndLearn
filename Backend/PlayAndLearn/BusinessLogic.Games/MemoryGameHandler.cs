using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Games.Models;
using Shared.Models.Entities;
using Shared.Models.Enums;
using Shared.Models.Enums.Games;
using Shared.Models.Extensions.Games;
using Shared.Models.Games;

namespace BusinessLogic.Games
{
    public class MemoryGameHandler : AGameHandler
    {
        private IGenericDbContextAccessor<GameTopicEntity> _gameTopicAccessor;
        private IGenericDbContextAccessor<WordEntity> _wordsAccessor;

        public MemoryGameHandler(AppDataContext appDataContext) : base(appDataContext)
        {
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _wordsAccessor = new GenericDbContextAccessor<WordEntity>(appDataContext);
        }

        public override async Task<AGameSettingsBarData> GetSettingsBarData()
        {
            try
            {
                var topics = new List<GameTopicEntity> { new GameTopicEntity { Id = -1, GameType = GameTypeEnum.Memory, TopicName = "Auswahl", TopicType = TopicTypeEnum.Unknown } };

                topics.AddRange(await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == GameTypeEnum.Memory));

                var index = 0;

                return new MemorySettingsBarData
                {
                    Title = "Memory",
                    GameLevelTypeItems = GetLevelTypeItems(),
                    PairCountSelectionItems = new List<int> { 4, 8, 16 },
                    GameTopics = (from topic in topics
                                  select topic.ToExportModel(index++))
                                  .ToList()
                };
            }
            catch (Exception exception)
            {
                return new MemorySettingsBarData
                {
                    Title = "Memory",
                };
            }
        }

        public async Task<List<WordModel>> GetWordList(GameLevelTypeEnum levelType)
        {
            try
            {
                var words = await _wordsAccessor.GetEntitiesAsync(x => x.LevelType == levelType);

                return (from word in words
                        select word.ToExportModel())
                        .ToList();

            }catch(Exception exception)
            {
                return new List<WordModel>();
            }
        }
    }
}
