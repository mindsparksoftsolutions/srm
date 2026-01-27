using System.ComponentModel.DataAnnotations;

namespace StudentFormsApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // Storing plain text as requested for simplicity

        [Required]
        public string Role { get; set; } = "Admin"; // "Admin" or "SuperAdmin"
    }
}
