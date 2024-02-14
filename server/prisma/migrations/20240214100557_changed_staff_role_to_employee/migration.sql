/*
  Warnings:

  - The values [STAFF] on the enum `StaffRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StaffRole_new" AS ENUM ('EMPLOYEE', 'SECTOR_LEADER', 'MANAGER', 'OWNER');
ALTER TABLE "Staff" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Staff" ALTER COLUMN "role" TYPE "StaffRole_new" USING ("role"::text::"StaffRole_new");
ALTER TYPE "StaffRole" RENAME TO "StaffRole_old";
ALTER TYPE "StaffRole_new" RENAME TO "StaffRole";
DROP TYPE "StaffRole_old";
ALTER TABLE "Staff" ALTER COLUMN "role" SET DEFAULT 'EMPLOYEE';
COMMIT;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "role" SET DEFAULT 'EMPLOYEE';
