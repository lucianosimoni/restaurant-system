/*
  Warnings:

  - You are about to drop the column `infoId` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `StaffInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffId]` on the table `StaffInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffId` to the `StaffInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('STAFF', 'SECTOR_LEADER', 'MANAGER', 'OWNER');

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_infoId_fkey";

-- DropIndex
DROP INDEX "Staff_infoId_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "infoId",
ADD COLUMN     "role" "StaffRole" NOT NULL DEFAULT 'STAFF';

-- AlterTable
ALTER TABLE "StaffInfo" DROP COLUMN "role",
ADD COLUMN     "staffId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StaffInfo_staffId_key" ON "StaffInfo"("staffId");

-- AddForeignKey
ALTER TABLE "StaffInfo" ADD CONSTRAINT "StaffInfo_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
