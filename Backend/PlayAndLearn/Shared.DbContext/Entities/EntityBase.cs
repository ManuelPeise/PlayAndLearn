using Shared.DbContext.Interfaces;

namespace Shared.DbContext.Entities
{
    public class EntityBase : IEntity
    {
        public Guid Id { get; set; }
    }
}
