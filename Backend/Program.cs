using Microsoft.EntityFrameworkCore;
using EMedicineBE.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


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

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();