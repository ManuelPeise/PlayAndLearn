namespace Shared.Models.Entities
{
    public class HighScore: EntityBase
    {
        public string Name { get; set; } = string.Empty;
        public int Level { get; set; }
        public int Attemts { get; set; }
        public int Score { get; set; }
    }
}
