﻿using Shared.Models.Entities;
using Shared.Models.Games;

namespace Shared.Models.Extensions.Games
{
    public static class WordExtensions
    {

        public static WordModel ToExportModel(this WordEntity entity)
        {
            return new WordModel
            {
                Key = entity.Id,
                Value = entity.Value,
                LevelType = entity.LevelType,
            };
        }

        public static WordEntity ToEntity(this WordModel model)
        {
            return new WordEntity
            {
                LevelType = model.LevelType,
                Value = model.Value,
            };
        }
    }
}