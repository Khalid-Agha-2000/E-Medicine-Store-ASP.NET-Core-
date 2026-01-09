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
        [Route("{userId}")]
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
        [Route("addtocart/{medId}/{quantity}/{id}")]
        public Response addToCart(int medId, int quantity, int id)
        {
            Response response = new Response();

            try
            {
                var med = _context.Medicines.FirstOrDefault(m => m.ID == medId);
                Console.WriteLine($"Fetched medicine: ID={med?.ID}, Name={med?.Name}");
                if (med == null)
                {
                    response.StatusCode = 404;
                    response.StatusMessage = "Medicine not found";
                    return response;
                }

                var existingItem = _context.Cart
                    .Where(c => c.MedicineID == medId && c.UserId.HasValue && c.UserId.Value == id)
                    .FirstOrDefault();

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
                    Cart cart = new Cart
                    {
                        MedicineID = med.ID,
                        MedicineName = med.Name,
                        Quantity = quantity,
                        UnitPrice = med.UnitPrice,
                        UserId = id,
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

        [HttpDelete]
        [Route("delete/{cartId}")]
        public async Task<Response> deleteFromCart(int cartId)
        {
            Response response = new Response();
            var product = _context.Cart
                .FirstOrDefault(cart => cart.ID == cartId);
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
        

        [HttpPost]
        [Route("placeAnOrder/{userId}")]
        public Response placeAnOrder(int userId)
        {
            Response response = new Response();

            var cartItems = _context.Cart
                .Where(c => c.UserId == userId).ToList();

            if(cartItems.Count == 0)
            {
                response.StatusCode = 100;
                response.StatusMessage = "Cart is empty";
                return response;
            }

            Orders order = new Orders
            {
                UserId = userId,
                OrderTotal = cartItems.Sum(c => c.TotalPrice),
                OrderStatus = "Pending",
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

        [HttpGet]
        [Route("get-all-orders")]
        public Response getAllOrders()
        {
            Response response = new Response();
            var orders = _context.Orders.ToList();
            response.listOrders = orders;
            response.StatusCode = 200;
            response.StatusMessage = "Orders returned";
            return response;
        }

        [HttpPut]
        [Route("update-order-status/{id}")]
        public Response updateOrderStatus(int id, string status)
        {
            Response response = new Response();
            var order = _context.Orders.FirstOrDefault(o => o.ID == id);
            if(order != null)
            {
                order.OrderStatus = status;
                _context.SaveChanges();
                response.StatusCode = 200;
                response.StatusMessage = "Status updated";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No order found";
            }
            return response;
        }
    }
}