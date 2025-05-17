using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public AuthController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult SignIn()
    {
        ViewData["Title"] = "Login";
        return View();
    }

    public IActionResult SignUp()
    {
        ViewData["Title"] = "Login";
        return View();
    }

    public IActionResult Logout()
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
