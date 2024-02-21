/*
  Warnings:

  - Made the column `authenticatedByStaffId` on table `Workstation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Workstation" DROP CONSTRAINT "Workstation_authenticatedByStaffId_fkey";

-- AlterTable
ALTER TABLE "Workstation" ALTER COLUMN "authenticatedByStaffId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_authenticatedByStaffId_fkey" FOREIGN KEY ("authenticatedByStaffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
