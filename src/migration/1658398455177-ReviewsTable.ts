import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReviewsTable1658398455177 implements MigrationInterface {
  name = 'ReviewsTable1658398455177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("reviewId" SERIAL NOT NULL, "rating" integer NOT NULL, "reviewTitle" character varying, "reviewBody" character varying NOT NULL, "userId" integer, "pubId" integer, CONSTRAINT "PK_6e1c269c269c0b470631bfde65c" PRIMARY KEY ("reviewId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_26e9dd8479dd8cedf2dcc274b77" FOREIGN KEY ("pubId") REFERENCES "pub"("pubId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_26e9dd8479dd8cedf2dcc274b77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
