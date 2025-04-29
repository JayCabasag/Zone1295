using System.Data;
using Zone1295.Models.DataModels;

public class ArtistRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public ArtistRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<Artist?> GetByIdAsync(int artistId)
    {
        try {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            const string query = @"
                SELECT *
                FROM zone1295_artist 
                WHERE product_id = @artistId";

            using var command = connection.CreateCommand();
            command.CommandText = query;
            command.Parameters.AddWithValue("@artistId", artistId);

            using var reader = await command.ExecuteReaderAsync();
            
                if (await reader.ReadAsync())
                {
                    return new Artist
                    {
                        Id = reader.GetInt32("artist_id"),
                        Name = reader.GetString("artist_name"),
                        Image = reader.GetString("artist_image"),
                        Description = reader.GetString("artist_description"),
                        CreatedAt = reader.IsDBNull("artist_created_at") ? null : reader.GetDateTime("artist_created_at"),
                        UpdatedAt = reader.IsDBNull("artist_updated_at") ? null : reader.GetDateTime("artist_updated_at")
                    };
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching artist by ID: {ex.Message}");
                return null;
            }
    }

    public async Task<int> GetAllArtistPagedCountAsync(QueryModel queryModel)
    {
        try
        {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            var query = "SELECT COUNT(*) FROM zone1295_artist WHERE 1=1";

            // Add search filter (if provided)
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                query += " AND (artits_name LIKE @search AND artist_description LIKE @search)";
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

    public async Task<List<Artist>> GetAllArtistPagedAsync(QueryModel queryModel)
    {
        var artists = new List<Artist>();
        try {
            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            // Build the base query
            var query = "SELECT * FROM zone1295_artist WHERE 1=1";

            // Add search filter (if provided)
            if (!string.IsNullOrEmpty(queryModel.Search))
            {
                query += " AND (artist_name LIKE @search OR artist_description LIKE @search)";
            }

            // Add ordering
            if (string.IsNullOrEmpty(queryModel.OrderBy) || string.IsNullOrEmpty(queryModel.SortBy))
            {
                queryModel.OrderBy = "artist_created_at";  // Default order by column
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
                var artist = new Artist
                {
                    Id = reader.GetInt32("artist_id"),
                    Name = reader.GetString("artist_name"),
                    Image = reader.IsDBNull("artist_image") ? null : reader.GetString("artist_image"),
                    Description = reader.GetString("artist_description"),
                    CreatedAt = reader.IsDBNull("artist_created_at") ? null : reader.GetDateTime("artist_created_at"),
                    UpdatedAt = reader.IsDBNull("artist_updated_at") ? null : reader.GetDateTime("artist_updated_at")
                };

                artists.Add(artist);
            }
        } catch (Exception ex){
            Console.Error.WriteLine($"Error fetching paged artists: {ex.Message}");
        }
        return artists;
    }
}
