import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1692827672446 implements MigrationInterface {
  name = 'CreateInitialTables1692827672446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "sequence_days" integer NOT NULL, "time_displayed" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lectiones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_time" TIMESTAMP WITH TIME ZONE NOT NULL, "text" character varying NOT NULL, "practical_resolution" character varying NOT NULL, "prayer_time" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_f4831829cd2f89908af601aac46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectiones" ADD CONSTRAINT "FK_3fd714efb6096b1e5a5168c7a9c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectiones" DROP CONSTRAINT "FK_3fd714efb6096b1e5a5168c7a9c"`,
    );
    await queryRunner.query(`DROP TABLE "lectiones"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
