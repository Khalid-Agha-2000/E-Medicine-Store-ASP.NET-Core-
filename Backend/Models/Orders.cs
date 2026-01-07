namespace EMedicineBE.Models
{
    public class Orders
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public string? OrderNumber { get; set; }
        public decimal OrderTotal { get; set; }
        public string? OrderStatus { get; set; }
        public ICollection<OrderItems> OrderItems { get; set; } = new List<OrderItems>();
    }
}