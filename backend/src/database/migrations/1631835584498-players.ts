import {MigrationInterface, QueryRunner} from "typeorm";

export class players1631835584498 implements MigrationInterface {
    name = 'players1631835584498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "position" text NOT NULL, "team" character varying NOT NULL, "foot" character varying NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "player_pkey" ON "player" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "player_pkey"`);
        await queryRunner.query(`DROP TABLE "player"`);
    }

}
