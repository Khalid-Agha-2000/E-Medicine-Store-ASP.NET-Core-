using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getMedicine/{id}")]
        public Response getMedicines(int id)
        {
            Response response = new Response();
            var medicine = _context.Medicines
                .FirstOrDefault(m => m.ID == id);
            response.medicine = medicine;
            return response;
        }

        [HttpGet]
        [Route("editMedicine/{id}")]
        public Response editMedicine(int id)
        {
            Response response = new Response();
            var medicine = _context.Medicines
                .FirstOrDefault(m => m.ID == id);
            response.medicine = medicine;
            return response;
        }
    }
}