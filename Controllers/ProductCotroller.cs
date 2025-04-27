using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class ProductController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public ProductController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Product";
        return View();
    }

    public IActionResult Details()
    {
        ViewData["Title"] = "Details";
        return View();
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
