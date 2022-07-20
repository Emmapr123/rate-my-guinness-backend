import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1658330024868 implements MigrationInterface {
  name = 'UsersTable1658330024868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(`ALTER TABLE "pub" DROP COLUMN "coordinates"`);
    await queryRunner.query(
      `ALTER TABLE "pub" ADD "coordinates" integer array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pub" DROP COLUMN "coordinates"`);
    await queryRunner.query(
      `ALTER TABLE "pub" ADD "coordinates" character varying`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
