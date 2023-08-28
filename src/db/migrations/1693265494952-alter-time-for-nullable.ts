import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTimeForNullable1693265494952 implements MigrationInterface {
  name = 'AlterTimeForNullable1693265494952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "sequence_days" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "time_displayed_in_seconds" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "time_displayed_in_seconds" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "sequence_days" SET NOT NULL`,
    );
  }
}
