import {MigrationInterface, QueryRunner} from "typeorm";

export class fkPlayers1631926828710 implements MigrationInterface {
    name = 'fkPlayers1631926828710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_team1_players_player" ("match_id" integer NOT NULL, "player_id" integer NOT NULL, CONSTRAINT "PK_fdf2c31b0b633cfb83ce73d1db4" PRIMARY KEY ("match_id", "player_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_02611f5a4a00c6c9f4fc285b41" ON "match_team1_players_player" ("match_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f7260aabf8de10e865b95a35b" ON "match_team1_players_player" ("player_id") `);
        await queryRunner.query(`CREATE TABLE "match_team2_players_player" ("match_id" integer NOT NULL, "player_id" integer NOT NULL, CONSTRAINT "PK_178710298a6c5c5e785907f2bd2" PRIMARY KEY ("match_id", "player_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2800d489e173842c4596b0c83d" ON "match_team2_players_player" ("match_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_de15d80fa710ecab9c6711192c" ON "match_team2_players_player" ("player_id") `);
        await queryRunner.query(`ALTER TABLE "match_team1_players_player" ADD CONSTRAINT "FK_02611f5a4a00c6c9f4fc285b41b" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "match_team1_players_player" ADD CONSTRAINT "FK_4f7260aabf8de10e865b95a35ba" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "match_team2_players_player" ADD CONSTRAINT "FK_2800d489e173842c4596b0c83dc" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "match_team2_players_player" ADD CONSTRAINT "FK_de15d80fa710ecab9c6711192c9" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_team2_players_player" DROP CONSTRAINT "FK_de15d80fa710ecab9c6711192c9"`);
        await queryRunner.query(`ALTER TABLE "match_team2_players_player" DROP CONSTRAINT "FK_2800d489e173842c4596b0c83dc"`);
        await queryRunner.query(`ALTER TABLE "match_team1_players_player" DROP CONSTRAINT "FK_4f7260aabf8de10e865b95a35ba"`);
        await queryRunner.query(`ALTER TABLE "match_team1_players_player" DROP CONSTRAINT "FK_02611f5a4a00c6c9f4fc285b41b"`);
        await queryRunner.query(`DROP INDEX "IDX_de15d80fa710ecab9c6711192c"`);
        await queryRunner.query(`DROP INDEX "IDX_2800d489e173842c4596b0c83d"`);
        await queryRunner.query(`DROP TABLE "match_team2_players_player"`);
        await queryRunner.query(`DROP INDEX "IDX_4f7260aabf8de10e865b95a35b"`);
        await queryRunner.query(`DROP INDEX "IDX_02611f5a4a00c6c9f4fc285b41"`);
        await queryRunner.query(`DROP TABLE "match_team1_players_player"`);
    }

}
