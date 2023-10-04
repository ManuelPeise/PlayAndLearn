using BusinessLogic.Shared.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Service.Administration.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class DbMigrationController: ControllerBase
    {
        private readonly IDatabaseMigrator _migrator;

        public DbMigrationController(IDatabaseMigrator migrator)
        {
            _migrator = migrator;
        }

        [HttpGet(Name = "MigrateDatabase")]
        public async Task MigrateDatabase()
        {
            await _migrator.MigrateDatabase();
        }
    }
}
