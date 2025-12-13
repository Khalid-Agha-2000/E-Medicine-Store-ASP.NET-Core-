using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;
using System.ComponentModel.DataAnnotations;

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

        [HttpPost]
        [Route("login")]
        public Response login(Users users)
        {
            Response response = new Response();

            var existingUser = _context.Users
                .FirstOrDefault(u => u.Email == users.Email && u.Password == users.Password);
            
            if(existingUser != null)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Valid User";
            } else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Invalid user";
            }
            return response;
        }

        [HttpPost]
        [Route("viewUser")]
        public Response viewUser(Users users)
        {
            Response response = new Response();

            var existingUser = _context.Users
                .FirstOrDefault(u => u.ID == users.ID);
            if(existingUser != null)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User exists!";
                response.user = existingUser;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User does not exist!";
                response.user = null;
            }
            return response;
        }


        [HttpPost]
        [Route("editUser")]
        public Response editUser(Users users)
        {
            Response response = new Response();

            var currentUser = _context.Users
                .FirstOrDefault(user => user.ID == users.ID);
            
            if(currentUser == null)
            {
                response.StatusCode = 100;
                response.StatusMessage = "Update failed! Please try later";
                return response;
            }
            
            currentUser.Email = users.Email;
            currentUser.FirstName = users.FirstName;
            currentUser.LastName = users.LastName;
            currentUser.Password = users.Password;
            int i = _context.SaveChanges();

            response.user = currentUser;
            if(i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Record updated successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Update failed! Please try later";
            }
            return response;
        }
    }
}