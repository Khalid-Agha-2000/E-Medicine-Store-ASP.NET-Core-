 using EMedicineBE.Models;
using EMedicineBE.Models.Dtos;

namespace EMedicineBE.Services.User
{
    public interface IUserService
    {
        Task<Response> RegisterAsync(Users user);

        Task<Response> LoginAsync(LoginDto login);

        Task<Response> GetUserAsync(int id);

        Task<Response> UpdateProfileAsync(int id, UpdateProfileDto profile);

        Task<Response> OrderListAsync(int userId);

        Task<Response> GetAllUsersAsync();

        Task<Response> DeleteUserAsync(int id);
    }
}