namespace Shared.Models.Games.Memory
{
    public class MemoryTrainingsDataImportModel
    {
        public int ChoiceOne { get; set; }
        public int ChoiceTwo { get; set; }
        public string ChoiceValue { get; set; } = string.Empty;
        public bool Matched { get; set; }
    }
}
