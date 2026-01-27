using System.ComponentModel.DataAnnotations;

namespace StudentFormsApi.Models
{
    public class EventDetail
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string EventType { get; set; } = string.Empty; // "Student" or "College"

        [Required]
        [MaxLength(100)]
        public string Date { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string Venue { get; set; } = string.Empty;

        public bool IsActive { get; set; } = false;
    }
}
