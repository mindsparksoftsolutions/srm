using Microsoft.EntityFrameworkCore;
using StudentFormsApi.Models;

namespace StudentFormsApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<CollegeStudent> CollegeStudents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("srm");
            base.OnModelCreating(modelBuilder);
        }
    }
}
