namespace Shared.Models.Entities
{
    public class LogMessageEntity: EntityBase
    {
        public Guid Key { get; set; }
        public string Module { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string ExMessage { get; set; } = string.Empty;
        public string Stacktrace { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }

    }
}
