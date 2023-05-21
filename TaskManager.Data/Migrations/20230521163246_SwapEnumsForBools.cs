using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Data.Migrations
{
    public partial class SwapEnumsForBools : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ToDo");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "ToDo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Started",
                table: "ToDo",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "Started",
                table: "ToDo");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ToDo",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
