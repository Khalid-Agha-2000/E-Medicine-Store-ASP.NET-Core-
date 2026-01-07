using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using EMedicineBE.Models;

namespace EMedicineBE.Models
{
    public class OrderItems
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int MedicineID { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        [ForeignKey("MedicineID")]
        public Medicines? Medicine { get; set; }
        [ForeignKey("OrderID")]
        [JsonIgnore]
        public Orders? Order { get; set; }
    }
}