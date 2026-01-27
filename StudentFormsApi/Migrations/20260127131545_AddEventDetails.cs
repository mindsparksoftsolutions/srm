using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudentFormsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEventDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventDetails",
                schema: "srm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Date = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Venue = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventDetails", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "srm",
                table: "EventDetails",
                columns: new[] { "Id", "Date", "EventType", "Venue" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "22nd Jan 2026 at 9.30 am", "Student", "Brindhavan Matriculation Higher Secondary School, Natrampalli" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "23rd Jan 2026 at 9.30 am", "College", "Marudhar Kesari Jain College for Women, Vaniyambadi" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventDetails",
                schema: "srm");
        }
    }
}
