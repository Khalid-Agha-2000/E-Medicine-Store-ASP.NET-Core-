using Microsoft.EntityFrameworkCore;
using EMedicineBE.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// EF core
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5001); // choose any port you like
});

var app = builder.Build();

// app.UseHttpsRedirection();
app.MapControllers();

app.Run();