using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;
using Microsoft.EntityFrameworkCore;
using EMedicineBE.Services.Cart;
using Microsoft.AspNetCore.Authorization;

namespace EMedicineBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize]
        [Route("get-cart/{userId}")]
        public async Task<Response> Cart(int userId)
        {
            return await _cartService.GetCartMedicinesAsync(userId);
        }

        [HttpPost]
        [Authorize]
        [Route("add-to-cart/{medId}/{quantity}/{id}")]
        public async Task<Response> AddToCart(int medId, int quantity, int id)
        {
            return await _cartService.AddToCartAsync(medId, quantity, id);
        }

        [HttpDelete]
        [Authorize]
        [Route("delete/{cartId}")]
        public async Task<Response> DeleteFromCart(int cartId)
        {
            return await _cartService.DeleteFromCartAsync(cartId);
        }
        

        [HttpPost]
        [Authorize]
        [Route("place-an-order/{userId}")]
        public async Task<Response> PlaceAnOrder(int userId)
        {
            return await _cartService.PlaceAnOrderAsync(userId);
        }

        // For manage orders page for admins
        [HttpGet]
        [Authorize (Roles = "admin")]
        [Route("get-all-orders")]
        public async Task<Response> GetAllOrders()
        {
            return await _cartService.GetAllOrdersAsync();
        }

        [HttpPut]
        [Authorize (Roles = "admin")]
        [Route("update-order-status/{id}")]
        public async Task<Response> UpdateOrderStatus(int id, string status)
        {
            return await _cartService.UpdateOrderStatusAsync(id, status);
        }
    }
}