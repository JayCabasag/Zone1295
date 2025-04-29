using Zone1295.Models.Validation;

namespace Zone1295.Models.DataModels
{
    public class QueryModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        
        [AllowedValue(new[] { "product_id", "product_name" })]
        public string? OrderBy { get; set; }

        [AllowedValue(new[] { "ASC", "DESC" })]
        public string? SortBy { get; set; }
        public string? Search { get; set; }
    }
}