/*
  Warnings:

  - You are about to drop the column `staffId` on the `Workstation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workstation" DROP CONSTRAINT "Workstation_staffId_fkey";

-- AlterTable
ALTER TABLE "Workstation" DROP COLUMN "staffId";
