using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

namespace EMedicineBE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("cart/{userId}")]
        public Response cart(int userId)
        {
            Response response = new Response();
            response.listCart = _context.Cart
                .Where(item => item.UserId == userId).ToList();
            
            if(response.listCart.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Medicines found";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No Medicines found";
            }
            return response;
        }

        [HttpPost]
        [Route("addtocart/{medId}/{quantity}")]
        public Response addToCart(int medId, int quantity)
        {
            Response response = new Response();

            try
            {
                var med = _context.Medicines.FirstOrDefault(m => m.ID == medId);
                if (med == null)
                {
                    response.StatusCode = 404;
                    response.StatusMessage = "Medicine not found";
                    return response;
                }

                var existingItem = _context.Cart
                    .Where(c => c.MedicineID == medId && c.UserId.HasValue && c.UserId.Value == 1)
                    .FirstOrDefault();

                if (existingItem != null)
                {
                    existingItem.Quantity += quantity;
                    existingItem.TotalPrice = existingItem.Quantity * existingItem.UnitPrice;
                    _context.Cart.Update(existingItem);

                    response.StatusCode = 200;
                    response.StatusMessage = "Increased Cart Quantity";
                }
                else
                {
                    Cart cart = new Cart
                    {
                        MedicineID = med.ID,
                        Quantity = quantity,
                        UnitPrice = med.UnitPrice,
                        UserId = 1,
                        TotalPrice = quantity * med.UnitPrice
                    };

                    _context.Cart.Add(cart);

                    response.StatusCode = 200;
                    response.StatusMessage = "Added to Cart";
                }

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = $"Server Error: {ex.Message}";
            }

            return response;
        }
        

        [HttpPost]
        [Route("placeAnOrder")]
        public Response placeAnOrder(Users users)
        {
            Response response = new Response();

            var cartItems = _context.Cart
                .Where(c => c.UserId == users.ID).ToList();

            if(cartItems.Count == 0)
            {
                response.StatusCode = 100;
                response.StatusMessage = "Cart is empty";
                return response;
            }

            Orders order = new Orders
            {
                UserId = users.ID,
                OrderTotal = cartItems.Sum(c => c.TotalPrice)
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            foreach(var item in cartItems)
            {
                OrderItems orderitem = new OrderItems
                {
                    OrderID = order.ID,
                    MedicineID = item.MedicineID,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.TotalPrice
                };
                _context.OrderItems.Add(orderitem);
            }
            _context.Cart.RemoveRange(cartItems);
            _context.SaveChanges();
            response.StatusCode = 200;
            response.StatusMessage = "Order placed successfully";
            response.order = order;
            return response;
        }
    }
}