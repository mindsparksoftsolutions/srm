using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentFormsApi.Models
{
    public class Student
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string StudentNameFatherInitial { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Class { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Section { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        public string SchoolNameLocation { get; set; } = string.Empty;

        public long? EMISNumber { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
