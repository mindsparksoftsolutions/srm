using System.ComponentModel.DataAnnotations;

namespace StudentFormsApi.Models
{
    public class School
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; } = string.Empty;
    }
}
