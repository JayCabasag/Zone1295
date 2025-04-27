using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class CartController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public CartController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Cart";
        return View();
    }

    public IActionResult Details()
    {
        ViewData["Title"] = "Details";
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
