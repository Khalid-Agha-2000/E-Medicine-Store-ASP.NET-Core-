using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

using EMedicineBE.Services.User;

namespace EMedicineBE.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("registration")]
        public async Task<Response> Register(Users users)
        {
            return await _userService.RegisterAsync(users);
        }

        [HttpPost]
        [Route("login")]
        public async Task<Response> Login(Users users)
        {
            return await _userService.LoginAsync(users);
        }

        [HttpGet]
        [Route("get-user/{id}")]
        public async Task<Response> GetUser(int id)
        {
            return await _userService.GetUserAsync(id);
        }


        [HttpGet]
        [Route("order-list/{userId}")]
        public async Task<Response> OrderList(int userId)
        {
            return await _userService.OrderListAsync(userId);
        }

        [HttpGet]
        [Route("get-all-users")]
        public async Task<Response> GetAllUsers()
        {
            return await _userService.GetAllUsersAsync();
        }

        [HttpDelete]
        [Route("delete-user/{id}")]
        public async Task<Response> DeleteUser(int id)
        {
            return await _userService.DeleteUserAsync(id);
        }
    }
}