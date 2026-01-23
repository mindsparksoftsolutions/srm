using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFormsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailToCollegeStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "srm",
                table: "CollegeStudents",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                schema: "srm",
                table: "CollegeStudents");
        }
    }
}
