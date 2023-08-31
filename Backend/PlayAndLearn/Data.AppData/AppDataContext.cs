using Microsoft.EntityFrameworkCore;

namespace Data.AppData
{
    public class AppDataContext: DbContext
    {
        public AppDataContext(DbContextOptions options): base(options) { }
    }
}