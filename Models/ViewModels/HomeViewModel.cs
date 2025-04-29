using TokenHive.Models.ViewModels;
using Zone1295.Models.DataModels;

namespace Zone1295.Models
{
    public class HomeViewModel : BaseViewModel
    {
        public IEnumerable<Artist>? FavoriteArtistList { get; set;}
        public IEnumerable<Product>? FeaturedProductList { get; set; }
        public IEnumerable<Product>? NewArrivalProductList { get; set; }
    }

}