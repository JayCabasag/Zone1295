using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zone1295.Models;
using Zone1295.Models.DataModels;

namespace Zone1295.Controllers;

public class ShopController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ProductRepository _productRepository;

    public ShopController(ILogger<HomeController> logger, ProductRepository productRepository)
    {
        _logger = logger;
        _productRepository = productRepository;
    }

    public async Task<IActionResult> Index(int? pageNumber, int? pageSize, string? orderBy, string? sortBy, string? search)
    {
        var query = new ProductQueryModel{
            PageNumber = pageNumber ?? 1,
            PageSize = pageSize ?? 15,
            OrderBy = orderBy ?? "product_id",
            SortBy = sortBy ?? "DESC",
            Search = search,
        };

        // Run both tasks in parallel
        var totalTask = _productRepository.GetAllProductsPagedCountAsync(query);
        var pagedTask = _productRepository.GetAllProductsPagedAsync(query);

        // Await both tasks to get the results
        await Task.WhenAll(totalTask, pagedTask);

        var total = totalTask.Result;
        var paged = pagedTask.Result;

        var viewModel = new ShopViewModel{
            ProductListCount = total,
            Search = search,
            ProductList = new Pagination<Product>(paged, total, query.PageNumber, query.PageSize),
        };

        ViewData["Title"] = "Shop";
        return View(viewModel);
    }

    public IActionResult Collection()
    {
        ViewData["Title"] = "Collection";
        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
