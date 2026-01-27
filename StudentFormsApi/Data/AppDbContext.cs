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
        public DbSet<School> Schools { get; set; }
        public DbSet<College> Colleges { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("srm");
            base.OnModelCreating(modelBuilder);

            // Seed Initial Event Details
            modelBuilder.Entity<EventDetail>().HasData(
                new EventDetail
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    EventType = "Student",
                    Date = "22nd Jan 2026 at 9.30 am",
                    Venue = "Brindhavan Matriculation Higher Secondary School, Natrampalli",
                    IsActive = true
                },
                new EventDetail
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    EventType = "College",
                    Date = "23rd Jan 2026 at 9.30 am",
                    Venue = "Marudhar Kesari Jain College for Women, Vaniyambadi",
                    IsActive = true
                }
            );

            // Seed Schools
            var schoolNames = new[]
            {
                "GGHS PATCHUR", "GHS K BANDARAPALLI", "GHS NAYANACHERUVU", "GHS No. 1. KOTHUR",
                "GHS THAGARAKUPPAM", "GHSS AMBALUR", "GHSS PATCHUR", "GOVT HSS JANGALAPURAM",
                "GOVT. BOYS. HSS NATRAMPALLI", "GOVT. GIRLS HSS NATRAMPALLI", "GOVT. HSS. DHASIRIYAPPANUR",
                "PUMS ADIPERAMANUR", "PUMS ARASANAPALLI", "PUMS ELARAPATTI", "PUMS GURUBHAVANIGUNDA",
                "PUMS KATHARI", "PUMS KONDAKINDANAPALLI", "PUMS MAMUDIMANAPALLI", "PUMS VELLANAYAKANERI",
                "BRINDAVAN MATRIC HSS, NATRAMPALLI", "RAJI GARDEN MATRIC HIGHER SECONDARY SCHOOL, NATRAMPALLI",
                "SRI RAMAKRISHNA VIDYALAYA MATRIC SCHOOL", "SSV MATRICULATION HIGHER SECONDARY SCHOOL, NATRAMPALLI"
            };

            var schools = new List<School>();
            for (int i = 0; i < schoolNames.Length; i++)
            {
                schools.Add(new School { Id = Guid.Parse($"33333333-3333-3333-3333-{i:D12}"), Name = schoolNames[i] });
            }
            modelBuilder.Entity<School>().HasData(schools);

            // Seed Colleges
            var collegeNames = new[]
            {
                "Bharathidasan Engineering College, Natrampalli", "G.P. Polytechnic College, Tirupattur",
                "GP Pharmacy College, Chinnamottur", "Government Arts And Science College, Patchur",
                "Government Arts And Science College, Tirupattur", "Holy Cross Arts and Science College for Women, Tirupattur",
                "Imayam Arts and Science College, Vaniyambadi", "Islamiah College (Autonomous)",
                "Islamiah Women's Arts and Science College, Vaniyambadi", "Marudhar Kesari Jain College for Women, Vaniyambadi",
                "Podhigai College of Engineering & Technology - PCET, Adiyur", "Priyadarshini Engineering College, Vaniyambadi",
                "Vaani Polytechnic College, Vaniyambadi", "Yelagiri Arts and Science College, Tirupattur", "Others"
            };

            var colleges = new List<College>();
            for (int i = 0; i < collegeNames.Length; i++)
            {
                colleges.Add(new College { Id = Guid.Parse($"44444444-4444-4444-4444-{i:D12}"), Name = collegeNames[i] });
            }
            modelBuilder.Entity<College>().HasData(colleges);
        }
    }
}
