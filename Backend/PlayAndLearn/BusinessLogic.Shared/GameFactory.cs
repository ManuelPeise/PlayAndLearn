using BusinessLogic.Shared.Interfaces;
using Shared.Games.Enums;
using Shared.Games.Interfaces;
using Shared.Games.Models;

namespace BusinessLogic.Shared
{
    public class GameFactory : IGameFactory
    {

        public GameFactory()
        {

        }

        public async Task<AGameSettings> GetSettings(IGameSettings settings)
        {
            switch (settings.GameType)
            {
                case GameTypeEnum.Unknown:
                    return await LoadDefaultGameSettings();
                case GameTypeEnum.Memory:
                    return await LoadMemoryGameSettings(settings);
                default:
                    return await LoadDefaultGameSettings();
            }
        }

        #region private members

        private async Task<AGameSettings> LoadDefaultGameSettings()
        {
            return await Task.FromResult(new DefaultGameSettings
            {
                GameType = GameTypeEnum.Unknown,
                GameName = string.Empty,
            });
        }

        private async Task<AGameSettings> LoadMemoryGameSettings(IGameSettings settings)
        {
            if (settings.isInitialisation)
            {
                return await Task.FromResult(new MemorySettings
                {
                    GameType = GameTypeEnum.Memory,
                    GameName = Constants.MemoryGame,
                    Topic = MemoryTopicTypeEnum.Unknown,
                    CountOfPairs = 0,
                    WordList = new List<Word>()
                });
            }

            return await Task.FromResult(new MemorySettings
            {
                GameType = GameTypeEnum.Memory,
                GameName = Constants.MemoryGame,
                Topic = settings.MemoryTopic,
                CountOfPairs = settings.CountOfPairs,
                WordList = GetWords(settings.MaxLetterCount, settings.MemoryTopic)
            }); ;
        }

        private List<Word> GetWords(int maxLetterCount, MemoryTopicTypeEnum topic)
        {
            if(topic != MemoryTopicTypeEnum.Alphabet)
            {
                return new List<Word>();
            }

            // TODO load Words from Database
            return new List<Word>();
        }

        #endregion

        #region dispose

        private bool disposedValue;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: Verwalteten Zustand (verwaltete Objekte) bereinigen
                }

                // TODO: Nicht verwaltete Ressourcen (nicht verwaltete Objekte) freigeben und Finalizer überschreiben
                // TODO: Große Felder auf NULL setzen
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
