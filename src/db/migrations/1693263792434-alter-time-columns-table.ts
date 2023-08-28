import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTimeColumnsTable1693263792434 implements MigrationInterface {
  name = 'AlterTimeColumnsTable1693263792434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "time_displayed" TO "time_displayed_in_seconds"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "time_displayed_in_seconds"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "time_displayed_in_seconds" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "lectiones" DROP COLUMN "total_time"`);
    await queryRunner.query(
      `ALTER TABLE "lectiones" ADD "total_time" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectiones" DROP COLUMN "prayer_time"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectiones" ADD "prayer_time" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectiones" DROP COLUMN "prayer_time"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectiones" ADD "prayer_time" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "lectiones" DROP COLUMN "total_time"`);
    await queryRunner.query(
      `ALTER TABLE "lectiones" ADD "total_time" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "time_displayed_in_seconds"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "time_displayed_in_seconds" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "time_displayed_in_seconds" TO "time_displayed"`,
    );
  }
}
