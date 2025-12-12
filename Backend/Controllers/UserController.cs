using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext Context)
        {
            _context = Context;
        }

        [HttpPost]
        [Route("registration")]
        public Response register(Users users)
        {
            Response response = new Response();
            _context.Users.Add(users);
            int result = _context.SaveChanges();
            if(result > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Registered Succesfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Registration Failed!";
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(users));
            return response;
        }

    }
}