using TokenHive.Models.ViewModels;
using Zone1295.Models.DataModels;

namespace Zone1295.Models
{
    public class ShopViewModel : BaseViewModel
    {
        public string? Search { get; set; }
        public int ProductListCount { get; set; }
        public Pagination<Product>? ProductList { get; set; }
    }

}