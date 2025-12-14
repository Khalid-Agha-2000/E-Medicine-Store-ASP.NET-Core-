using Microsoft.EntityFrameworkCore;
using EMedicineBE.Models;

namespace EMedicineBE.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<Users> Users {get; set;}
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Medicines> Medicines { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }

    }   
}