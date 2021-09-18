import {MigrationInterface, QueryRunner} from "typeorm";

export class matches1631924892300 implements MigrationInterface {
    name = 'matches1631924892300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "team1" character varying NOT NULL, "team2" character varying NOT NULL, "team1score" integer NOT NULL, "team2score" integer NOT NULL, "winner" character varying NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "match_pkey" ON "match" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "match_pkey"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
