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
        public DbSet<EventDetail> EventDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Initial Event Details
            modelBuilder.Entity<EventDetail>().HasData(
                new EventDetail
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    EventType = "Student",
                    Date = "22nd Jan 2026 at 9.30 am",
                    Venue = "Brindhavan Matriculation Higher Secondary School, Natrampalli"
                },
                new EventDetail
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    EventType = "College",
                    Date = "23rd Jan 2026 at 9.30 am",
                    Venue = "Marudhar Kesari Jain College for Women, Vaniyambadi"
                }
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("srm");
            base.OnModelCreating(modelBuilder);
        }
    }
}
