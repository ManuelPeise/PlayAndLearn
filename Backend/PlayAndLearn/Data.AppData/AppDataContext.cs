using Microsoft.EntityFrameworkCore;
using Shared.Models.Entities;

namespace Data.AppData
{
    public class AppDataContext: DbContext
    {
        public DbSet<GameTopicEntity> GameTopics { get; set; }
        public DbSet<WordEntity> Words { get; set; }
        public DbSet<GameSettingsEntity> GameSettings { get; set; }
        public DbSet<LogMessageEntity> LogMessages { get; set; }
        public DbSet<FileStorageEntity> FileStorage { get; set; }
        public DbSet<MemoryStatisticData> MemoryStatisticData { get; set; }
        public AppDataContext(DbContextOptions options): base(options) { }

    }
}