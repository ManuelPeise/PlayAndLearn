using System.ComponentModel.DataAnnotations;

namespace Shared.DbContext.Interfaces
{
    public interface IEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}
