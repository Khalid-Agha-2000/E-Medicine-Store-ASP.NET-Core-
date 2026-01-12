using System.ComponentModel.DataAnnotations;

namespace EMedicineBE.Models
{
    public class Medicines
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Medicine name is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Medicine manufacturer is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Enter a valid manufacturer name")]
        public string Manufacturer { get; set; }

        [Required(ErrorMessage = "Medicine price is required")]
        [Range(0.01, 9999.99, ErrorMessage = "Price must be between 0.01 and 9999.99")]
        public decimal UnitPrice { get; set; }

        [Required(ErrorMessage = "Medicine description is required")]
        [StringLength(10000, MinimumLength = 20, ErrorMessage = "A valid description is required")]
        public string Description { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public DateTime? ExpDate { get; set; }
        public string? ImageUrl { get; set; }
        public string Status { get; set; }
    }
}