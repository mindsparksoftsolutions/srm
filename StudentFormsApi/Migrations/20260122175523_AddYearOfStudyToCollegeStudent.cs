using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFormsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddYearOfStudyToCollegeStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "YearOfStudy",
                schema: "srm",
                table: "CollegeStudents",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "YearOfStudy",
                schema: "srm",
                table: "CollegeStudents");
        }
    }
}
