using BusinessLogic.Shared.Interfaces;
using Data.AppData;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace BusinessLogic.Shared
{
    public class GenericDbContextAccessor<T> : IGenericDbContextAccessor<T> where T : class, new()
    {
        private AppDataContext _context;
        private bool disposedValue;

        public GenericDbContextAccessor(AppDataContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(T entity, Func<T, bool> expression)
        {
            try
            {
                var table = _context.Set<T>();

                var existing = table.FirstOrDefault(expression);

                if (existing == null)
                {
                    await _context.AddAsync(entity);
                    _context.Entry(entity).State = EntityState.Added;

                    return await _context.SaveChangesAsync();
                }

                throw new Exception("Could not add entity, Reason: already exists!");

            }
            catch (Exception exception)
            {
                // TODO Log Error

                return await Task.FromResult(0);
            }
        }

        public async Task<int> DeleteEntityAsync(T entity, Func<T, bool> expression)
        {
            try
            {
                var tabe = _context.Set<T>();

                var entityToDelete = tabe?.FirstOrDefault(expression);

                if (entityToDelete != null)
                {
                    _context.Remove(entityToDelete);
                    _context.Entry(entityToDelete).State = EntityState.Deleted;

                    return await _context.SaveChangesAsync();
                }

                throw new Exception($"Could not delete entity [{entity.GetType().Name}].");

            }
            catch (Exception exception)
            {
                // TODO Log Error

                return await Task.FromResult(0);
            }
        }

        public async Task<List<T>> GetAllEntitiesAsync()
        {
            try
            {
                var table = _context.Set<T>();

                var entries = table.ToList();

                if (entries?.Count > 0)
                {
                    return await Task.FromResult(entries);
                }

                throw new Exception($"Could not load entities type of [{typeof(T)}] from database!");
            }
            catch (Exception exception)
            {
                // TODO Log Error

                return await Task.FromResult(new List<T>());
            }
        }

        public async Task<List<T>> GetEntitiesAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                var table = _context.Set<T>();

                if (table.Any())
                {
                    return await Task.FromResult(table.Where(expression).ToList());
                }

                throw new Exception($"Could not load entities type of [{typeof(T)}] from database!");
            }
            catch (Exception exception)
            {
                // TODO Log Error

                return await Task.FromResult(new List<T>());
            }
        }

        public async Task<T?> GetEntityAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                var table = _context.Set<T>();

                if (table.Any())
                {
                    var entity = table.FirstOrDefault(expression);

                    return await Task.FromResult(entity);
                }

                throw new Exception($"Could not find entiy [{typeof(T)}]");
            }
            catch (Exception exception)
            {
                // TODO Log Error

                return default;
            }
        }

        public async Task<int> UpdateEntityAsync(T entity, Func<T, bool> expression)
        {
            try
            {
                var table = _context.Set<T>();
                var entityToUpdate = table?.FirstOrDefault(expression);

                if (entityToUpdate != null)
                {
                    entityToUpdate = entity;
                    _context.Entry(entityToUpdate).State = EntityState.Modified;

                    await _context.AddAsync(entityToUpdate);
                    return await _context.SaveChangesAsync();
                }

                throw new Exception($"Could not update entity [{entity.GetType().Name}].");

            }
            catch (Exception exception)
            {
                // TODO Log Error

                return await Task.FromResult(0);
            }
        }

        #region dispose

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                }

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
