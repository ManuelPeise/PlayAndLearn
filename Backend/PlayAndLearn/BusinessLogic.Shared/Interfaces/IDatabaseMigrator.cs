using Data.AppData;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IDatabaseMigrator: IDisposable
    {
        Task MigrateDatabase();
    }
}
