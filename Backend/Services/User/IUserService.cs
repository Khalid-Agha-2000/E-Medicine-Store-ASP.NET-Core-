 using EMedicineBE.Models;

 namespace EMedicineBE.Services.User
{
    public interface IUserService
    {
        Task<Response> RegisterAsync(Users user);

        Task<Response> LoginAsync(Users user);

        Task<Response> GetUserAsync(int id);

        Task<Response> OrderListAsync(int userId);

        Task<Response> GetAllUsersAsync();

        Task<Response> DeleteUserAsync(int id);
    }
}