import { MigrationInterface, QueryRunner } from 'typeorm';

export class coordinateString1660665873819 implements MigrationInterface {
  name = 'coordinateString1660665873819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pub" DROP COLUMN "coordinates"`);
    await queryRunner.query(
      `ALTER TABLE "pub" ADD "coordinates" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pub" DROP COLUMN "coordinates"`);
    await queryRunner.query(
      `ALTER TABLE "pub" ADD "coordinates" integer array`,
    );
  }
}
