using Microsoft.EntityFrameworkCore;
using EMedicineBE.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// EF core
builder.Services.AddDbContext<AppDbContext>(Options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();