using Shared.Models.Entities;
using Shared.Models.Games;

namespace Shared.Models.Extensions.Games
{
    public static class MemoryCardExtensions
    {
        public static MemoryCardExportModel ToExportModel(this MemoryCardEntity entity, byte[] background)
        {
            return new MemoryCardExportModel
            {
                Key = Guid.NewGuid(),
                Foreground = entity.Image.ToList(),
                Background = background.ToList(),
                Disabled = false,
            };
        }
    }
}
