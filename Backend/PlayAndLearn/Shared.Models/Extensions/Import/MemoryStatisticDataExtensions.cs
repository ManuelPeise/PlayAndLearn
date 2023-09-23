using Shared.Models.Entities;
using Shared.Models.Games.Memory;

namespace Shared.Models.Extensions.Import
{
    public static class MemoryStatisticDataExtensions
    {
        public static MemoryStatisticData ToStaticticData(this MemoryTrainingsDataImportModel model)
        {
            return new MemoryStatisticData
            {
                Key = Guid.NewGuid(),
                ChoiceOne = model.ChoiceOne,
                ChoiceTwo = model.ChoiceTwo,
                ChoiceValue = model.ChoiceValue,
                Matched = model.Matched,
            };
        }
    }
}
