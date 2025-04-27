namespace Zone1295.Models.DataModels
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public IEnumerable<string>?  Images { get; set; }
        public double Price { get; set; }
        public double OnSalePrice { get; set; }
        public int StockCount { get; set; }
        public IEnumerable<string>? Category { get; set; }
        public string? Artist { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsBestSelling { get; set; }
        public bool? IsPopular { get; set; }
        public bool? IsOnSale { get; set; }
        public IEnumerable<string>? Collection { get; set; }
        public DateTime? CreatedAt { get; set;}
        public DateTime? UpdatedAt { get; set;}
        public double? Rating { get; set;}  
    }
}