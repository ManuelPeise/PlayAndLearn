using System.Linq.Expressions;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IGenericDbContextAccessor<T> : IDisposable where T : class, new()
    {
        Task<List<T>> GetAllEntitiesAsync();
        Task<List<T>> GetEntitiesAsync(Expression<Func<T, bool>> expression);
        Task<T> GetEntityAsync(Expression<Func<T, bool>> expression);
        Task<int> AddAsync(T entity, Func<T, bool> expression);
        Task<int> UpdateEntityAsync(T entity, Func<T, bool> expression);
        Task<int> DeleteEntityAsync(T entity, Func<T, bool> expression);
    }
}