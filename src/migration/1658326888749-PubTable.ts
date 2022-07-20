import { MigrationInterface, QueryRunner } from 'typeorm';

export class PubTable1658326888749 implements MigrationInterface {
  name = 'PubTable1658326888749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pub" ("pubId" SERIAL NOT NULL, "name" character varying NOT NULL, "rating" integer, "reviewCount" integer, "url" character varying, "coordinates" character varying, CONSTRAINT "PK_b0e4913a7450c204a6656f3b552" PRIMARY KEY ("pubId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pub"`);
  }
}
