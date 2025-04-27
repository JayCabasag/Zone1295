using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class SearchController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public SearchController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Search";
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
