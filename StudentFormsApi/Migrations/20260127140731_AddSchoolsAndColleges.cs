using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudentFormsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddSchoolsAndColleges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colleges",
                schema: "srm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colleges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                schema: "srm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "srm",
                table: "Colleges",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("44444444-4444-4444-4444-000000000000"), "Bharathidasan Engineering College, Natrampalli" },
                    { new Guid("44444444-4444-4444-4444-000000000001"), "G.P. Polytechnic College, Tirupattur" },
                    { new Guid("44444444-4444-4444-4444-000000000002"), "GP Pharmacy College, Chinnamottur" },
                    { new Guid("44444444-4444-4444-4444-000000000003"), "Government Arts And Science College, Patchur" },
                    { new Guid("44444444-4444-4444-4444-000000000004"), "Government Arts And Science College, Tirupattur" },
                    { new Guid("44444444-4444-4444-4444-000000000005"), "Holy Cross Arts and Science College for Women, Tirupattur" },
                    { new Guid("44444444-4444-4444-4444-000000000006"), "Imayam Arts and Science College, Vaniyambadi" },
                    { new Guid("44444444-4444-4444-4444-000000000007"), "Islamiah College (Autonomous)" },
                    { new Guid("44444444-4444-4444-4444-000000000008"), "Islamiah Women's Arts and Science College, Vaniyambadi" },
                    { new Guid("44444444-4444-4444-4444-000000000009"), "Marudhar Kesari Jain College for Women, Vaniyambadi" },
                    { new Guid("44444444-4444-4444-4444-000000000010"), "Podhigai College of Engineering & Technology - PCET, Adiyur" },
                    { new Guid("44444444-4444-4444-4444-000000000011"), "Priyadarshini Engineering College, Vaniyambadi" },
                    { new Guid("44444444-4444-4444-4444-000000000012"), "Vaani Polytechnic College, Vaniyambadi" },
                    { new Guid("44444444-4444-4444-4444-000000000013"), "Yelagiri Arts and Science College, Tirupattur" },
                    { new Guid("44444444-4444-4444-4444-000000000014"), "Others" }
                });

            migrationBuilder.InsertData(
                schema: "srm",
                table: "Schools",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("33333333-3333-3333-3333-000000000000"), "GGHS PATCHUR" },
                    { new Guid("33333333-3333-3333-3333-000000000001"), "GHS K BANDARAPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000002"), "GHS NAYANACHERUVU" },
                    { new Guid("33333333-3333-3333-3333-000000000003"), "GHS No. 1. KOTHUR" },
                    { new Guid("33333333-3333-3333-3333-000000000004"), "GHS THAGARAKUPPAM" },
                    { new Guid("33333333-3333-3333-3333-000000000005"), "GHSS AMBALUR" },
                    { new Guid("33333333-3333-3333-3333-000000000006"), "GHSS PATCHUR" },
                    { new Guid("33333333-3333-3333-3333-000000000007"), "GOVT HSS JANGALAPURAM" },
                    { new Guid("33333333-3333-3333-3333-000000000008"), "GOVT. BOYS. HSS NATRAMPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000009"), "GOVT. GIRLS HSS NATRAMPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000010"), "GOVT. HSS. DHASIRIYAPPANUR" },
                    { new Guid("33333333-3333-3333-3333-000000000011"), "PUMS ADIPERAMANUR" },
                    { new Guid("33333333-3333-3333-3333-000000000012"), "PUMS ARASANAPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000013"), "PUMS ELARAPATTI" },
                    { new Guid("33333333-3333-3333-3333-000000000014"), "PUMS GURUBHAVANIGUNDA" },
                    { new Guid("33333333-3333-3333-3333-000000000015"), "PUMS KATHARI" },
                    { new Guid("33333333-3333-3333-3333-000000000016"), "PUMS KONDAKINDANAPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000017"), "PUMS MAMUDIMANAPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000018"), "PUMS VELLANAYAKANERI" },
                    { new Guid("33333333-3333-3333-3333-000000000019"), "BRINDAVAN MATRIC HSS, NATRAMPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000020"), "RAJI GARDEN MATRIC HIGHER SECONDARY SCHOOL, NATRAMPALLI" },
                    { new Guid("33333333-3333-3333-3333-000000000021"), "SRI RAMAKRISHNA VIDYALAYA MATRIC SCHOOL" },
                    { new Guid("33333333-3333-3333-3333-000000000022"), "SSV MATRICULATION HIGHER SECONDARY SCHOOL, NATRAMPALLI" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colleges",
                schema: "srm");

            migrationBuilder.DropTable(
                name: "Schools",
                schema: "srm");
        }
    }
}
