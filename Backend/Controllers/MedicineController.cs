using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;
using EMedicineBE.Services.Medicine;

namespace EMedicineBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMedicineService _medicineService;
        public MedicineController(AppDbContext context, IMedicineService medicineService)
        {
            _context = context;
            _medicineService = medicineService;
        }

        [HttpGet]
        [Route("shop")]
        public async Task<Response> Shop()
        {
            return await _medicineService.GetShopMedicinesAsync();
        }
        

        [HttpGet]
        [Route("get-medicine/{id}")]
        public async Task<Response> GetMedicines(int id)
        {
            return await _medicineService.GetMedicineById(id);
        }

        [HttpPost]
        [Route("add-medicine")]
        public async Task<Response> AddMedicine(Medicines medicine)
        {
            return await _medicineService.AddMedicineAsync(medicine);
        }

        [HttpGet]
        [Route("get-medicines")]
        public async Task<Response> GetMedicines()
        {
            return await _medicineService.GetAllMedicines();
        }

        [HttpPut]
        [Route("edit-medicine/{id}")]
        public async Task<Response> EditMedicine(int id, Medicines newMed)
        {
            return await _medicineService.EditMedicineAsync(id, newMed);
        }

        [HttpDelete]
        [Route("delete-medicine/{id}")]
        public async Task<Response> DeleteMedicine(int id)
        {
            return await _medicineService.DeleteMedicineAsync(id);
        }
    }
}