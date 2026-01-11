using EMedicineBE.Models;

namespace EMedicineBE.Services.Medicine
{
    public interface ICartService
    {
        Task<Response> GetCartMedicinesAsync(int userId);

        Task<Response> AddToCartAsync(int medId, int quantity, int id);

        Task<Response> DeleteFromCartAsync(int cartId);

        Task<Response> PlaceAnOrderAsync(int userId);

        Task<Response> GetAllOrdersAsync();

        Task<Response> UpdateOrderStatusAsync(int id, string status);
    }
}