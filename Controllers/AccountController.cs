using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;

namespace Zone1295.Controllers;

public class AccountController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public AccountController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = "Account";
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

    public IActionResult Logout()
    {
        ViewData["Title"] = "Logout";
        return View();
    }

    public IActionResult Orders()
    {
        ViewData["Title"] = "Orders";
        return View();
    }

    public IActionResult PaymentMethods()
    {
        ViewData["Title"] = "Payment Methods";
        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
