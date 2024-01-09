/*
  Warnings:

  - You are about to drop the column `imageURL` on the `CategoryInfo` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `ItemInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoryInfo" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "ItemInfo" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "WorkstationInfo" ADD COLUMN     "imageUrl" TEXT;
