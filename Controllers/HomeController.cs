using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Home";
        return View();
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
