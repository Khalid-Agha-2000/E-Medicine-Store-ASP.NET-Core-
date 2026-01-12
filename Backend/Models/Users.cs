using System.ComponentModel.DataAnnotations;

namespace EMedicineBE.Models
{
    public class Users
    {
        public int ID {get; set;}

        [Required(ErrorMessage = "First name is required")]
        [StringLength(50, ErrorMessage = "First Name Can't be longer than 50 characters")]
        public string? FirstName {get; set;}

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(50, ErrorMessage = "Last name can't be longer than 50 characters")]
        public string? LastName {get; set;}

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 4, ErrorMessage = "Password must be at least 6 characters")]
        public string? Password {get; set;}

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email {get; set;}
        public decimal? Fund { get; set; }
        public string? Type { get; set; }
        public int? Status { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}