namespace Zone1295.Models.DataModels
{
    public class Artist
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image{ get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set;}
        public DateTime? UpdatedAt { get; set;}
    }
}