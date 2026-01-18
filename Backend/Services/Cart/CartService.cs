using EMedicineBE.Models;
using EMedicineBE.Data;
using Microsoft.EntityFrameworkCore;
using EMedicineBE.Services.Medicine;

namespace EMedicineBE.Services.Cart
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Response> GetCartMedicinesAsync(int userId)
        {
            Response response = new Response();
            response.listCart = await _context.Cart
                .Where(item => item.UserId == userId).ToListAsync();
            
            if(response.listCart.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicines found";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "No Medicines found";
            }
            return response;
        }

        public async Task<Response> AddToCartAsync(int medId, int quantity, int id)
        {
            Response response = new Response();

            try
            {
                var med = await _context.Medicines.FirstOrDefaultAsync(m => m.ID == medId);
                Console.WriteLine($"Fetched medicine: ID={med?.ID}, Name={med?.Name}");
                if (med == null)
                {
                    response.StatusCode = 404;
                    response.StatusMessage = "Medicine not found";
                    return response;
                }

                var existingItem = await _context.Cart
                    .Where(c => c.MedicineID == medId && c.UserId.HasValue && c.UserId.Value == id)
                    .FirstOrDefaultAsync();

                if (existingItem != null)
                {
                    existingItem.Quantity += quantity;
                    existingItem.TotalPrice = existingItem.Quantity * existingItem.UnitPrice;
                    _context.Cart.Update(existingItem);
                    existingItem.MedicineName = med.Name;
                    response.StatusCode = 200;
                    response.StatusMessage = "Increased Cart Quantity";
                }
                else
                {
                    Models.Cart cart = new Models.Cart
                    {
                        MedicineID = med.ID,
                        MedicineName = med.Name,
                        Quantity = quantity,
                        UnitPrice = med.UnitPrice,
                        UserId = id,
                        TotalPrice = quantity * med.UnitPrice
                    };

                    await _context.Cart.AddAsync(cart);

                    response.StatusCode = 200;
                    response.StatusMessage = "Added to Cart";
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = $"Server Error: {ex.Message}";
            }

            return response;
        }

        public async Task<Response> DeleteFromCartAsync(int cartId)
        {
            Response response = new Response();
            var product = await _context.Cart
                .FirstOrDefaultAsync(cart => cart.ID == cartId);
            response.cart = product;

            if(product == null)
            {
                response.StatusCode = 404;
                response.StatusMessage = "Product not found in cart";
                return response;
            }
            _context.Cart.Remove(product);
            await _context.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Product removed from";
            
            return response;
        }

        public async Task<Response> PlaceAnOrderAsync(int userId)
{
            Response response = new Response();

            var cartItems = await _context.Cart
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (cartItems.Count == 0)
            {
                response.StatusCode = 400;
                response.StatusMessage = "Your cart is empty";
                return response;
            }

            foreach (var item in cartItems)
            {
                var medicine = await _context.Medicines
                    .FirstOrDefaultAsync(m => m.ID == item.MedicineID);

                if (medicine == null)
                {
                    response.StatusCode = 404;
                    response.StatusMessage = "Medicine not found";
                    return response;
                }

                if (medicine.Quantity < item.Quantity)
                {
                    response.StatusCode = 400;
                    response.StatusMessage = $"Not enough stock for {medicine.Name}";
                    return response;
                }
            }

            Orders order = new Orders
            {
                UserId = userId,
                OrderTotal = cartItems.Sum(c => c.TotalPrice),
                OrderStatus = "Pending"
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            foreach (var item in cartItems)
            {
                var medicine = await _context.Medicines
                    .FirstAsync(m => m.ID == item.MedicineID);

                medicine.Quantity -= item.Quantity;

                OrderItems orderItem = new OrderItems
                {
                    OrderID = order.ID,
                    MedicineID = item.MedicineID,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.TotalPrice
                };

                await _context.OrderItems.AddAsync(orderItem);
            }

            _context.Cart.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            response.StatusCode = 200;
            response.StatusMessage = "Order placed successfully";
            response.order = order;
            return response;
        }

        public async Task<Response> GetAllOrdersAsync()
        {
            Response response = new Response();
            var orders = await _context.Orders.ToListAsync();
            response.listOrders = orders;
            response.StatusCode = 200;
            response.StatusMessage = "Orders returned";
            return response;
        }

        public async Task<Response> UpdateOrderStatusAsync(int id, string status)
        {
            Response response = new Response();
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.ID == id);
            if(order != null)
            {
                order.OrderStatus = status;
                await _context.SaveChangesAsync();
                response.StatusCode = 200;
                response.StatusMessage = "Status updated";
            }
            else
            {
                response.StatusCode = 404;
                response.StatusMessage = "No order found";
            }
            return response;
        }
    }
}