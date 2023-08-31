using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Shared.Models.Enums;
using Shared.Models.Enums.Games;

#nullable disable

namespace Data.AppData.Migrations
{
    /// <inheritdoc />
    public partial class AddTopicsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GameTopics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TopicName = table.Column<string>(type: "longtext", nullable: false),
                    TopicType = table.Column<int>(type: "int", nullable: false),
                    GameType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameTopics", x => x.Id);
                })
            .Annotation("MySQL:Charset", "utf8mb4");

            var sql = $"INSERT INTO gametopics (id, topicname, topictype, gametype) VALUES (0, 'Alphabet', {(int)TopicTypeEnum.Alphabet}, {(int)GameTypeEnum.Memory});";

            migrationBuilder.Sql(sql);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameTopics");
        }
    }
}
