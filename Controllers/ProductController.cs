using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class ProductController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ProductRepository _productRepository;

    public ProductController(ILogger<HomeController> logger, ProductRepository productRepository)
    {
        _logger = logger;
        _productRepository = productRepository;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Product";
        return View();
    }

    public async Task<IActionResult> Details(int id)
    {
        var model = new ProductViewModel{
            Product = await _productRepository.GetByIdAsync(id),
        };
        return View(model);
    }

    public IActionResult Addresses()
    {
        ViewData["Title"] = "Addresses";
        return View();
    }

    public IActionResult Login()
    {
        ViewData["Title"] = "Login";
        return View();
    }

    public IActionResult Orders()
    {
        ViewData["Title"] = "Orders";
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
