using System.Data;
using Zone1295.Models.DataModels;

public class ProductRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public ProductRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<Product?> GetByIdAsync(int productId)
    {
        try {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            const string query = @"
                SELECT *
                FROM zone1295_product 
                WHERE product_id = @productId";

            using var command = connection.CreateCommand();
            command.CommandText = query;
            command.Parameters.AddWithValue("@productId", productId);

            using var reader = await command.ExecuteReaderAsync();
            
                if (await reader.ReadAsync())
                {
                    return new Product
                    {
                        Id = reader.GetInt32("product_id"),
                        Name = reader.IsDBNull("product_name") ? null : reader.GetString("product_name"),
                        Images = reader.IsDBNull("product_image") ? null : reader.GetString("product_image").Split(","),
                        Price = reader.IsDBNull("product_price") ? 0 : reader.GetDouble("product_price"),
                        OnSalePrice = reader.IsDBNull("product_onsale_price") ? 0 : reader.GetDouble("product_onsale_price"),
                        StockCount = reader.IsDBNull("product_stock_count") ? 0 : reader.GetInt32("product_stock_count"),
                        Category = reader.IsDBNull("product_category") ? null : reader.GetString("product_category").Split(','),
                        Artist = reader.IsDBNull("product_artist") ? null : reader.GetString("product_artist"),
                        IsDeleted = reader.IsDBNull("product_is_deleted") ? null : reader.GetBoolean("product_is_deleted"),
                        IsBestSelling = reader.IsDBNull("product_is_bestselling") ? null : reader.GetBoolean("product_is_bestselling"),
                        IsPopular = reader.IsDBNull("product_is_popular") ? null : reader.GetBoolean("product_is_popular"),
                        IsOnSale = reader.IsDBNull("product_is_onsale") ? null : reader.GetBoolean("product_is_onsale"),
                        Collection = reader.IsDBNull("product_collection") ? null : reader.GetString("product_collection").Split(','),
                        CreatedAt = reader.IsDBNull("product_created_at") ? null : reader.GetDateTime("product_created_at"),
                        UpdatedAt = reader.IsDBNull("product_updated_at") ? null : reader.GetDateTime("product_updated_at"),
                        Rating = reader.IsDBNull("product_rating") ? null : reader.GetDouble("product_rating"),
                    };
                }

                return null; // Product not found
            }
            catch (Exception ex)
            {
                // Log or handle the exception here
                Console.Error.WriteLine($"Error fetching product by ID: {ex.Message}");
                return null;
            }
    }

    public async Task<int> GetAllProductsPagedCountAsync(QueryModel queryModel)
    {
        try
        {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            var query = "SELECT COUNT(*) FROM zone1295_product WHERE 1=1";

            // Add search filter (if provided)
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                query += " AND (product_name LIKE @search OR product_category LIKE @search OR product_artist LIKE @search)";
            }

            using var command = connection.CreateCommand();
            command.CommandText = query;

            // Add parameters
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                command.Parameters.AddWithValue("@search", "%" + queryModel.Search + "%");
            }

            var result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            Console.Error.WriteLine($"Error fetching product count: {ex.Message}");
            return 0;
        }
    }

    public async Task<List<Product>> GetAllProductsPagedAsync(QueryModel queryModel)
    {
        var products = new List<Product>();
        
        try
        {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            // Build the base query
            var query = "SELECT * FROM zone1295_product WHERE 1=1";

            // Add search filter (if provided)
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                query += " AND (product_name LIKE @search OR product_category LIKE @search OR product_artist LIKE @search)";
            }

            // Add ordering
            if (string.IsNullOrEmpty(queryModel.OrderBy) || string.IsNullOrEmpty(queryModel.SortBy))
            {
                queryModel.OrderBy = "product_created_at";  // Default order by column
                queryModel.SortBy = "DESC";         // Default sorting (descending)
            }

            query += $" ORDER BY {queryModel.OrderBy} {queryModel.SortBy}";

            // Add pagination (LIMIT and OFFSET)
            query += " LIMIT @limit OFFSET @offset";

            using var command = connection.CreateCommand();
            command.CommandText = query;

            // Add parameters to avoid SQL injection
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                command.Parameters.AddWithValue("@search", "%" + queryModel.Search + "%");
            }
            command.Parameters.AddWithValue("@limit", queryModel.PageSize);
            command.Parameters.AddWithValue("@offset", (queryModel.PageNumber - 1) * queryModel.PageSize);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                products.Add(new Product
                {
                    Id = reader.GetInt32("product_id"),
                    Name = reader.IsDBNull("product_name") ? null : reader.GetString("product_name"),
                    Images = reader.IsDBNull("product_image") ? null : reader.GetString("product_image").Split(","),
                    Price = reader.IsDBNull("product_price") ? 0 : reader.GetDouble("product_price"),
                    OnSalePrice = reader.IsDBNull("product_onsale_price") ? 0 : reader.GetDouble("product_onsale_price"),
                    StockCount = reader.IsDBNull("product_stock_count") ? 0 : reader.GetInt32("product_stock_count"),
                    Category = reader.IsDBNull("product_category") ? null : reader.GetString("product_category").Split(','),
                    Artist = reader.IsDBNull("product_artist") ? null : reader.GetString("product_artist"),
                    IsDeleted = reader.IsDBNull("product_is_deleted") ? null : reader.GetBoolean("product_is_deleted"),
                    IsBestSelling = reader.IsDBNull("product_is_bestselling") ? null : reader.GetBoolean("product_is_bestselling"),
                    IsPopular = reader.IsDBNull("product_is_popular") ? null : reader.GetBoolean("product_is_popular"),
                    IsOnSale = reader.IsDBNull("product_is_onsale") ? null : reader.GetBoolean("product_is_onsale"),
                    Collection = reader.IsDBNull("product_collection") ? null : reader.GetString("product_collection").Split(','),
                    CreatedAt = reader.IsDBNull("product_created_at") ? null : reader.GetDateTime("product_created_at"),
                    UpdatedAt = reader.IsDBNull("product_updated_at") ? null : reader.GetDateTime("product_updated_at"),
                    Rating = reader.IsDBNull("product_rating") ? null : reader.GetDouble("product_rating"),
                });
            }

            return products;
        }
        catch (Exception ex)
        {
            // Log or handle the exception here
            Console.Error.WriteLine($"Error fetching paged products: {ex.Message}");
            throw new Exception("An error occurred while fetching the products.", ex); // Rethrow or return an empty list
        }
    }
}
