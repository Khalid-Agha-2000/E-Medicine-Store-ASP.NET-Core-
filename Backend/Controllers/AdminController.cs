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
        [Route("editMedicine/{id}")]
        public Response editMedicine(int id)
        {
            Response response = new Response();
            var medicine = _context.Medicines
                .FirstOrDefault(m => m.ID == id);
            response.medicine = medicine;
            return response;
        }

        
        [HttpPost]
        [Route("editMedicine/{id}")]
        public Response editMedicine(Medicines newMed)
        {
            Response response = new Response();
            var oldMed = _context.Medicines
                .FirstOrDefault(m => m.ID == newMed.ID);

            if(oldMed != null)
            {
                oldMed.Name = newMed.Name;
                oldMed.Manufacturer = newMed.Manufacturer;
                oldMed.UnitPrice = newMed.UnitPrice;
                oldMed.Discount = newMed.Discount;
                oldMed.Quantity = newMed.Quantity;
                oldMed.ExpDate = newMed.ExpDate;
                oldMed.ImageUrl = newMed.ImageUrl;
                oldMed.Status = newMed.Status;
                _context.SaveChanges();

                response.medicine = newMed;
                response.StatusCode = 200;
                response.StatusMessage = "Medicine updated successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Medicine not found";
            }
            
            return response;
        }
    }
}