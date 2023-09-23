namespace Shared.Models.Entities
{
    public class MemoryStatisticData:EntityBase
    {
        public Guid Key { get; set; }
        public int ChoiceOne { get; set; }
        public int ChoiceTwo { get; set; }
        public string ChoiceValue { get; set; } = string.Empty;
        public bool Matched { get; set; }
    }
}
