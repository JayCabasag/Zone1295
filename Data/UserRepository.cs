using System.Data;
using Zone1295.Models.DataModels;

public class UserRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public UserRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        var users = new List<User>();
        using var connection = _connectionFactory.CreateConnection();
        await connection.OpenAsync();

        using var command = connection.CreateCommand();
        command.CommandText = "SELECT Id, Name, Email FROM Users";

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            users.Add(new User
            {
                Id = reader.GetInt32("Id"),
                Username = reader.GetString("Name"),
                Email = reader.GetString("Email")
            });
        }
        return users;
    }
}
