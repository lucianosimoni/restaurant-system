/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `StaffTimesheet` table. All the data in the column will be lost.
  - Added the required column `imageInUrl` to the `StaffTimesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StaffTimesheet" DROP COLUMN "imageUrl",
ADD COLUMN     "imageInUrl" TEXT NOT NULL,
ADD COLUMN     "imageOutUrl" TEXT;
