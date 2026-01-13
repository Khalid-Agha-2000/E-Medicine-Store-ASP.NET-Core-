using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

using EMedicineBE.Services.User;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using EMedicineBE.Models.Dtos;
using Microsoft.AspNetCore.Authorization;

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
        [Route("register")]
        public async Task<Response> Register([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return new Response
                {
                    StatusCode = 400,
                    StatusMessage = "Invalid registration data"
                };
            }

            return await _userService.RegisterAsync(users);
        }

        [HttpPost]
        [Route("login")]
        public async Task<Response> Login([FromBody] LoginDto login)
        {
            if (!ModelState.IsValid)
            {
                return new Response
                {
                    StatusCode = 400,
                    StatusMessage = "Invalid login data"
                };
            }
            return await _userService.LoginAsync(login);
        }
        
        // for profile page for all users
        [HttpGet]
        [Authorize]
        [Route("get-user/{id}")]
        public async Task<Response> GetUser(int id)
        {
            return await _userService.GetUserAsync(id);
        }

        // for orders page for all user types
        [HttpGet]
        [Authorize]
        [Route("order-list/{userId}")]
        public async Task<Response> OrderList(int userId)
        {
            return await _userService.OrderListAsync(userId);
        }

        // For profile page for all users
        [HttpPut]
        [Authorize]
        [Route("update-profile/{id}")]
        public async Task<Response> UpdateProfile(int id, [FromBody] UpdateProfileDto profile)
        {
            if (!ModelState.IsValid)
            {
                return new Response
                {
                    StatusCode = 400,
                    StatusMessage = "Invalid profile data"
                };
            }
            return await _userService.UpdateProfileAsync(id, profile);
        }

        // For manage users page for admin
        [HttpGet]
        [Authorize (Roles = "admin")]
        [Route("get-all-users")]
        public async Task<Response> GetAllUsers()
        {
            return await _userService.GetAllUsersAsync();
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        [Route("delete-user/{id}")]
        public async Task<Response> DeleteUser(int id)
        {
            return await _userService.DeleteUserAsync(id);
        }
    }
}