using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;
using EMedicineBE.Services.Medicine;
using Microsoft.AspNetCore.Authorization;

namespace EMedicineBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineService _medicineService;
        public MedicineController(IMedicineService medicineService)
        {
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
        public async Task<Response> GetMedicine(int id)
        {
            return await _medicineService.GetMedicineById(id);
        }

        [HttpPost]
        [Authorize (Roles = "admin")]
        [Route("add-medicine")]
        public async Task<Response> AddMedicine([FromBody] Medicines medicine)
        {
            if (!ModelState.IsValid)
            {
                return new Response
                {
                    StatusCode = 400,
                    StatusMessage = "Invalid medicine data"
                };
            }
            return await _medicineService.AddMedicineAsync(medicine);
        }

        // For manage medicines page for admin
        [HttpGet]
        [Authorize (Roles = "admin")]
        [Route("get-medicines")]
        public async Task<Response> GetMedicines()
        {
            return await _medicineService.GetAllMedicines();
        }

        [HttpPut]
        [Authorize (Roles = "admin")]
        [Route("edit-medicine/{id}")]
        public async Task<Response> EditMedicine(int id, [FromBody] Medicines newMed)
        {
            if (!ModelState.IsValid)
            {
                return new Response
                {
                    StatusCode = 400,
                    StatusMessage = "Invalid medicine data"
                };
            }
            return await _medicineService.EditMedicineAsync(id, newMed);
        }

        [HttpDelete]
        [Authorize (Roles = "admin")]
        [Route("delete-medicine/{id}")]
        public async Task<Response> DeleteMedicine(int id)
        {
            return await _medicineService.DeleteMedicineAsync(id);
        }
    }
}