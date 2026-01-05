using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

namespace EMedicineBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MedicineController(AppDbContext context)
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
    }
}