using Microsoft.AspNetCore.Mvc;
using EMedicineBE.Data;
using EMedicineBE.Models;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("addToCart")]
        public Response addToCart(Cart carts)
        {
            Response response = new Response();
            var existignItem = _context.Carts
            .FirstOrDefault(cart => cart.UserId == carts.UserId && cart.MedicineID == carts.MedicineID);
            if(existignItem != null)
            {
                existignItem.Quantity += carts.Quantity;
                existignItem.TotalPrice = existignItem.Quantity * existignItem.UnitPrice;
            }
            else
            {
                _context.Carts.Add(carts);
            }
            _context.SaveChanges();
            response.listCart = new List<Cart> {carts};
            return response;
        }
    }
}