using EMedicineBE.Models;
using EMedicineBE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EMedicineBE.Models.Dtos;

namespace EMedicineBE.Services.User
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response> RegisterAsync(Users users)
        {
            Response response = new Response();
            users.CreatedOn = DateTime.Now;
            users.Status = 1;
            users.Fund = 0;
            users.Type = "user";
            await _context.Users.AddAsync(users);
            int result = await _context.SaveChangesAsync();
            if(result > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Registered Succesfully";
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "Registration Failed!";
            }
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(users));
            return response;
        }

        public async Task<Response> LoginAsync(LoginDto login)
        {
            Response response = new Response();

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email && 
                    EF.Functions.Collate(u.Password, "SQL_Latin1_General_CP1_CS_AS") == login.Password);
            
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
                response.StatusCode = 401;
                response.StatusMessage = "Invalid user";
            }
            return response;
        }

        public async Task<Response> UpdateProfileAsync(int id, UpdateProfileDto profile)
        {
            Response response = new Response();

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                response.StatusCode = 404;
                response.StatusMessage = "User not found";
                return response;
            }

            user.FirstName = profile.FirstName;
            user.LastName = profile.LastName;
            user.Email = profile.Email;
            user.Password = profile.Password;

            await _context.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Profile updated successfully";
            response.user = user;
            return response;
        }

        public async Task<Response> GetUserAsync(int id)
        {
            Response response = new Response();
            var ourUser = await _context.Users
                .FirstOrDefaultAsync(user => user.ID == id);
            
            response.user = ourUser;
            
            if(ourUser != null)
            {
                response.StatusMessage = "User Found";
                response.StatusCode = 200;
            }
            else
            {
                response.StatusCode = 40;
                response.StatusMessage = "User not Found";
            }

            return response;
        }

        public async Task<Response> OrderListAsync(int userId)
        {
            Response response = new Response();

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Medicine)
                .ToListAsync();

            response.listOrders = orders;
            response.StatusCode = 200;
            response.StatusMessage = orders.Count > 0 ? "Orders fetched" : "No orders found";

            return response;
        }

        public async Task<Response> GetAllUsersAsync()
        {
            Response response = new Response();
            var users = await _context.Users.ToListAsync();
            response.StatusCode = 200;
            response.StatusMessage = "All users returned";
            response.listUsers = users;
            return response;
        }

        public async Task<Response> DeleteUserAsync(int id)
        {
            Response response = new Response();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.ID == id);
            if(user != null)
            {
                if(user.Type == "admin")
                {
                    response.StatusCode = 403;
                    response.StatusMessage = "Cannot delete admins";
                    return response;
                }
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                response.StatusCode = 200;
                response.StatusMessage = "User deleted";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "User not found";
            }
            return response;
        }
    }
}