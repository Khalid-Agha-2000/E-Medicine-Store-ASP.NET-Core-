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

        [HttpPost]
        [Route("addMedicine")]
        public async Task<Response> addMedicine(Medicines medicine)
        {
            Response response = new Response();
            medicine.ExpDate = DateTime.Now.AddYears(2);
            medicine.Status = "In Stock";

            response.medicine = medicine;
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Medicine Saved Successfully";
            return response;
        }

        [HttpGet]
        [Route("get-medicines")]
        public Response getMedicines()
        {
            Response response = new Response();
            response.listMedicines = _context.Medicines.ToList();
            response.StatusCode = 200;
            response.StatusMessage = "All medicines returned";
            return response;
        }

        [HttpPut]
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
                oldMed.Description = newMed.Description;
                _context.SaveChanges();

                response.medicine = oldMed;
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