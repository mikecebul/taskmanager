using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Data.Migrations
{
    public partial class MakeStatusEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ToDo");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "ToDo",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Started",
                table: "ToDo",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
