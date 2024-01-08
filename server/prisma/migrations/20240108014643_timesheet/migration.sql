/*
  Warnings:

  - You are about to drop the column `categoryInfoId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `itemInfoId` on the `Item` table. All the data in the column will be lost.
  - The `type` column on the `ItemInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unitSystem` column on the `ItemInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `screenInfoId` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `staffInfoId` on the `Staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[infoId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[infoId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[infoId]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[infoId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `infoId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infoId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infoId` to the `Screen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `infoId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('UN', 'KG');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('REVENDA', 'EMBALAGEM', 'MATERIA_PRIMA', 'PRODUTO_EM_PROCESSO', 'PRODUTO_ACABADO');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_categoryInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_itemInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_screenInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_staffInfoId_fkey";

-- DropIndex
DROP INDEX "Category_categoryInfoId_key";

-- DropIndex
DROP INDEX "Item_itemInfoId_key";

-- DropIndex
DROP INDEX "Screen_screenInfoId_key";

-- DropIndex
DROP INDEX "Staff_staffInfoId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryInfoId",
ADD COLUMN     "infoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemInfoId",
ADD COLUMN     "infoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemInfo" DROP COLUMN "type",
ADD COLUMN     "type" "ItemType" NOT NULL DEFAULT 'EMBALAGEM',
DROP COLUMN "unitSystem",
ADD COLUMN     "unitSystem" "UnitSystem" NOT NULL DEFAULT 'UN';

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "screenInfoId",
ADD COLUMN     "infoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "staffInfoId",
ADD COLUMN     "infoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StaffTimesheet" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "StaffTimesheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "infoId" INTEGER NOT NULL,
    "settingId" INTEGER NOT NULL,

    CONSTRAINT "Workstation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkstationInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "WorkstationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkstationSetting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "WorkstationSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SectorToWorkstation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ScreenToWorkstationSetting" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffTimesheet_staffId_key" ON "StaffTimesheet"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_title_key" ON "Workstation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_infoId_key" ON "Workstation"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "Workstation_settingId_key" ON "Workstation"("settingId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkstationSetting_title_key" ON "WorkstationSetting"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_SectorToWorkstation_AB_unique" ON "_SectorToWorkstation"("A", "B");

-- CreateIndex
CREATE INDEX "_SectorToWorkstation_B_index" ON "_SectorToWorkstation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScreenToWorkstationSetting_AB_unique" ON "_ScreenToWorkstationSetting"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreenToWorkstationSetting_B_index" ON "_ScreenToWorkstationSetting"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_infoId_key" ON "Category"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_infoId_key" ON "Item"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_infoId_key" ON "Screen"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_infoId_key" ON "Staff"("infoId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "StaffInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffTimesheet" ADD CONSTRAINT "StaffTimesheet_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "CategoryInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "ItemInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "ScreenInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "WorkstationInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "WorkstationSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToWorkstation" ADD CONSTRAINT "_SectorToWorkstation_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToWorkstation" ADD CONSTRAINT "_SectorToWorkstation_B_fkey" FOREIGN KEY ("B") REFERENCES "Workstation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToWorkstationSetting" ADD CONSTRAINT "_ScreenToWorkstationSetting_A_fkey" FOREIGN KEY ("A") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToWorkstationSetting" ADD CONSTRAINT "_ScreenToWorkstationSetting_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkstationSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
