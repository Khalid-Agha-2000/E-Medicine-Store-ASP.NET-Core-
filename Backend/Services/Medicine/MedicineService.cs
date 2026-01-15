using EMedicineBE.Models;
using EMedicineBE.Data;
using EMedicineBE.Services.Medicine;
using Microsoft.EntityFrameworkCore;

namespace EMedicineBE.Services.Medicine
{
    public class MedicineService: IMedicineService
    {
        private readonly AppDbContext _context;

        public MedicineService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response> GetShopMedicinesAsync()
        {
            Response response = new Response();
            response.listMedicines = await _context.Medicines.ToListAsync();
            if(response.listMedicines.Count() > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicines";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "No medicines found";
            }
            return response;
        }

        public async Task<Response> GetMedicineById(int id)
        {
            Response response = new Response();
            var medicine = await _context.Medicines
                .FirstOrDefaultAsync(m => m.ID == id);
            response.medicine = medicine;
            if(medicine != null)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User returned";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "User not found";
            }
            return response;
        }

        public async Task<Response> AddMedicineAsync(Medicines medicine)
        {
            Response response = new Response();
            medicine.ExpDate = DateTime.Now.AddYears(2);
            medicine.Status = "In Stock";

            response.medicine = medicine;
            _context.Medicines.Add(medicine);
            var result = await _context.SaveChangesAsync();

            if(result > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicine Saved Successfully";
            }
            else
            {
                response.StatusCode = 400;
                response.StatusMessage = "Medicine was not saved";
            }

            
            return response;
        }
        
        public  async Task<Response> GetAllMedicines()
        {
            Response response = new Response();
            response.listMedicines = await _context.Medicines.ToListAsync();
            response.StatusCode = 200;
            response.StatusMessage = "All medicines returned";
            return response;
        }

        public async Task<Response> EditMedicineAsync(int id, Medicines newMed)
        {
            Response response = new Response();
            var oldMed = await _context.Medicines
                .FirstOrDefaultAsync(m => m.ID == id);

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
                await _context.SaveChangesAsync();

                response.medicine = oldMed;
                response.StatusCode = 200;
                response.StatusMessage = "Medicine updated successfully";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "Medicine not found";
            }
            
            return response;
        }

        public async Task<Response> DeleteMedicineAsync(int id){
            Response response = new Response();
            var medicine = _context.Medicines.FirstOrDefault(med => med.ID == id);
            response.medicine = medicine;

            if(medicine != null)
            {
                _context.Medicines.Remove(medicine);
                await _context.SaveChangesAsync();
                response.StatusCode = 200;
                response.StatusMessage = "Medicine removed";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "Could not find medicine";
            }
            return response;
        }
    }
}