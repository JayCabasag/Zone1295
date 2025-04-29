using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;
using Zone1295.Models.DataModels;

namespace Zone1295.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ArtistRepository _artistRepository;
    private readonly ProductRepository _productRepository;

    public HomeController(ILogger<HomeController> logger, ArtistRepository artistRepository, ProductRepository productRepository)
    {
        _logger = logger;
        _artistRepository = artistRepository;
        _productRepository = productRepository;
    }

    public async Task<IActionResult> Index()
    {
        var favArtistsQuery = new QueryModel{
            PageNumber = 1,
            PageSize = 15,
            OrderBy = "artist_id",
            SortBy = "DESC",
        };

        var productQuery = new QueryModel{
            PageNumber = 1,
            PageSize = 8,
            OrderBy = "product_id",
            SortBy = "DESC",
        };

        var model = new HomeViewModel{
            Menu = "home",
            MenuTitle = "Home",
            SubMenu = "",
            FavoriteArtistList = await _artistRepository.GetAllArtistPagedAsync(favArtistsQuery),
            FeaturedProductList = await _productRepository.GetAllProductsPagedAsync(productQuery),
            NewArrivalProductList = await _productRepository.GetAllProductsPagedAsync(productQuery)
        };
        ViewData["Title"] = "Home";
        return View(model);
    }

    public IActionResult Privacy()
    {
        ViewData["Title"] = "Privacy";
        return View();
    }

    public IActionResult About()
    {
        ViewData["Title"] = "About";
        return View();
    }

    public IActionResult Contact()
    {
        ViewData["Title"] = "Contact";
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
