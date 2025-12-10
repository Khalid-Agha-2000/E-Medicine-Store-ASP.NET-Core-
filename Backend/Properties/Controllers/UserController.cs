using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;

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
    }
}