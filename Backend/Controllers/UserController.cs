using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

using EMedicineBE.Services.User;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using EMedicineBE.Models.Dtos;

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

        [HttpPut]
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