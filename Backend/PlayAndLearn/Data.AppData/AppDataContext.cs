using Microsoft.EntityFrameworkCore;
using Shared.Models.Entities;

namespace Data.AppData
{
    public class AppDataContext: DbContext
    {
        public DbSet<GameTopicEntity> GameTopics { get; set; }
        public DbSet<WordEntity> Words { get; set; }

        public AppDataContext(DbContextOptions options): base(options) { }
    }
}