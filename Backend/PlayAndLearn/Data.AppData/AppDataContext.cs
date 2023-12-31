﻿using Microsoft.EntityFrameworkCore;
using Shared.Models.Entities;

namespace Data.AppData
{
    public class AppDataContext: DbContext
    {
        public DbSet<GameTopicEntity> GameTopics { get; set; }
        public DbSet<LogMessageEntity> LogMessages { get; set; }
        public DbSet<FileStorageEntity> FileStorage { get; set; }
        public DbSet<HighScore> MemoryHighScore { get; set; }
        public AppDataContext(DbContextOptions options): base(options) { }
    }
}