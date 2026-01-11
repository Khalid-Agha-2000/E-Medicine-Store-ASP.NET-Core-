using EMedicineBE.Models;

namespace EMedicineBE.Services.Medicine
{
    public interface IMedicineService
    {
        Task<Response> GetShopMedicinesAsync();

        Task<Response> GetMedicineById(int id);

        Task<Response> AddMedicineAsync(Medicines medicine);

        Task<Response> GetAllMedicines();

        Task<Response> EditMedicineAsync(int id, Medicines newMed);

        Task<Response> DeleteMedicineAsync(int id);
    }
}