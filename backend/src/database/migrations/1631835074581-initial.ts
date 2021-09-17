import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1631835074581 implements MigrationInterface {
    name = 'initial1631835074581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "something" ("id" SERIAL NOT NULL, "something" integer NOT NULL, CONSTRAINT "PK_fb3239f7aa12ad721f617f1d6d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "something_pkey" ON "something" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "something_pkey"`);
        await queryRunner.query(`DROP TABLE "something"`);
    }

}
