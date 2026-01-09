using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;
using Microsoft.EntityFrameworkCore;


using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.ObjectPool;

namespace EMedicineBE.Controllers
{
    [Route("/[controller]")]
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
            users.CreatedOn = DateTime.Now;
            users.Status = 1;
            users.Fund = 0;
            users.Type = "user";
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
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, existingUser.ID.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, existingUser.Email ?? ""),
                    new Claim("role", existingUser.Type ?? "user")   
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("khalidaghasupersecretkey1234567890"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(24),
                    signingCredentials: creds
                );

                response.StatusCode = 200;
                response.StatusMessage = "Valid User";
                response.token = new JwtSecurityTokenHandler().WriteToken(token);

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Invalid user";
            }
            return response;
        }

        [HttpGet]
        [Route("getUser/{id}")]
        public Response getUser(int id)
        {
            Response response = new Response();
            var ourUser = _context.Users
                .FirstOrDefault(user => user.ID == id);
            
            response.user = ourUser;
            
            if(ourUser != null)
            {
                response.StatusMessage = "User Found";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User not Found";
            }

            return response;
        }

        [HttpGet]
        [Route("shop")]
        public Response shop()
        {
            Response response = new Response();
            response.listMedicines = _context.Medicines.ToList();
            if(response.listMedicines.Count() > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicines";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No medicines found";
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
        [Route("updateUser/{id}")]
        public Response editUser(Users users, int id)
        {
            Response response = new Response();

            var currentUser = _context.Users
                .FirstOrDefault(user => user.ID == id);
            
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

        [HttpGet]
        [Route("orderList/{userId}")]
        public Response orderList(int userId)
        {
            Response response = new Response();

            var orders = _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Medicine)
                .ToList();

            response.listOrders = orders;
            response.StatusCode = 200;
            response.StatusMessage = orders.Count > 0 ? "Orders fetched" : "No orders found";

            return response;
        }

        [HttpGet]
        [Route("get-all-users")]
        public Response getAllUsers()
        {
            Response response = new Response();
            var users = _context.Users.ToList();
            response.StatusCode = 200;
            response.StatusMessage = "All users returned";
            response.listUsers = users;
            return response;
        }
    }
}