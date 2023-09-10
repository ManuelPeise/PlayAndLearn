using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Shared.Games.Models;
using Shared.Models;
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
        private IGenericDbContextAccessor<MemoryCardEntity> _cardsAccessor;
        public MemoryGameHandler(AppDataContext appDataContext) : base(appDataContext)
        {
            _gameTopicAccessor = new GenericDbContextAccessor<GameTopicEntity>(appDataContext);
            _wordsAccessor = new GenericDbContextAccessor<WordEntity>(appDataContext);
            _cardsAccessor = new GenericDbContextAccessor<MemoryCardEntity>(appDataContext);
        }

        public override async Task<MemoryGameData> GetGameData(MemoryGameDataRequestModel requestModel)
        {
            var gameId = Guid.NewGuid();

            try
            {
                var selectedWord = await GetWord(requestModel.GameLevel);

                if (selectedWord != null)
                {
                    var cardsCount = CalculateCardsCount(selectedWord.Value.Length);

                    var availableCards = await _cardsAccessor.GetEntitiesAsync(x => x.TopicId == requestModel.TopicId && x.GameType == requestModel.GameType);

                    if (!availableCards.Any())
                    {
                        throw new Exception($"There are no cards for this topic!{Environment.NewLine}Please, upload cards first!");
                    }

                    var background = availableCards.Where(x => x.IsBackgroundImage).FirstOrDefault();

                    if (background == null)
                    {
                        throw new Exception($"Could not load card background!{ Environment.NewLine }Please, upload cards first!");
                    }

                    var selectedCards = availableCards.Where(x => selectedWord.Value.ToLower().Contains(x.Name.ToLower())).ToList();

                    if(!selectedCards.Any()) 
                    {
                        throw new Exception($"Could not select any cards for the selected topic!");
                    }

                    var selectedCardsValues = selectedCards.Select(x => x.Name);

                    selectedCards.AddRange(availableCards.Where(x => !selectedCardsValues.Contains(x.Name)).Take(cardsCount - selectedCardsValues.Count()).ToList());

                    var cardmodels = (from card in selectedCards
                                      select card.ToExportModel(background.Image)).ToList();

                    return new MemoryGameData
                    {
                        GameId = gameId,
                        GameLevel = requestModel.GameLevel,
                        GameType = requestModel.GameType,
                        Cards = cardmodels.ToList(),
                        Pairs = selectedCards.Count(),
                        Error = string.Empty
                    };

                }

                throw new Exception($"There are no words for level: {Enum.GetName(typeof(GameLevelTypeEnum), requestModel.GameLevel)} available! Please, upload wordlist first!");

            }
            catch (Exception exception)
            {
                return new MemoryGameData { GameId = gameId, GameType = requestModel.GameType, GameLevel = requestModel.GameLevel, Error = exception.Message };

            }
        }

        public override async Task<AGameSettingsBarData> GetSettingsBarData()
        {
            try
            {


               var  topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == GameTypeEnum.Memory);

                return new MemorySettingsBarData
                {
                    Title = "Memory",
                    GameLevelTypeItems = GetLevelTypeItems(),
                    GameTopics = (from topic in topics
                                  select new KeyValueItem
                                  {
                                      Key = topic.Id,
                                      Value = topic.TopicName
                                  }).ToList()
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

        public async Task<List<KeyValueItem>> GetTopics()
        {
            try
            {
                var topics = await _gameTopicAccessor.GetEntitiesAsync(x => x.GameType == GameTypeEnum.Memory);

                return (from topic in topics
                        select new KeyValueItem
                        {
                            Key = topic.Id,
                            Value = topic.TopicName
                        }).ToList();
            }
            catch(Exception exception)
            {
                return new List<KeyValueItem>();
            }
        }
       

        private async Task<WordEntity?> GetWord(GameLevelTypeEnum levelType)
        {
            var words = await _wordsAccessor.GetEntitiesAsync(x => x.LevelType == levelType);

            if (words.Any())
            {
                var index = new Random().Next(0, words.Count - 1);

                return words[index];
            }

            return null;
        }

        private int CalculateCardsCount(int wordLength)
        {
            var count = wordLength + 1;

            while (count % 4 != 0)
            {
                count++;

            }

            return count;
        }
    }
}
