/*
  Warnings:

  - You are about to drop the column `settingId` on the `Workstation` table. All the data in the column will be lost.
  - You are about to drop the `Screen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScreenInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkstationSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ScreenToSector` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ScreenToWorkstationSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SectorToWorkstationSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_infoId_fkey";

-- DropForeignKey
ALTER TABLE "Workstation" DROP CONSTRAINT "Workstation_settingId_fkey";

-- DropForeignKey
ALTER TABLE "_ScreenToSector" DROP CONSTRAINT "_ScreenToSector_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScreenToSector" DROP CONSTRAINT "_ScreenToSector_B_fkey";

-- DropForeignKey
ALTER TABLE "_ScreenToWorkstationSetting" DROP CONSTRAINT "_ScreenToWorkstationSetting_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScreenToWorkstationSetting" DROP CONSTRAINT "_ScreenToWorkstationSetting_B_fkey";

-- DropForeignKey
ALTER TABLE "_SectorToWorkstationSetting" DROP CONSTRAINT "_SectorToWorkstationSetting_A_fkey";

-- DropForeignKey
ALTER TABLE "_SectorToWorkstationSetting" DROP CONSTRAINT "_SectorToWorkstationSetting_B_fkey";

-- DropIndex
DROP INDEX "Workstation_settingId_key";

-- AlterTable
ALTER TABLE "Workstation" DROP COLUMN "settingId";

-- DropTable
DROP TABLE "Screen";

-- DropTable
DROP TABLE "ScreenInfo";

-- DropTable
DROP TABLE "WorkstationSetting";

-- DropTable
DROP TABLE "_ScreenToSector";

-- DropTable
DROP TABLE "_ScreenToWorkstationSetting";

-- DropTable
DROP TABLE "_SectorToWorkstationSetting";

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "infoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppToSector" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AppToWorkstation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "App_title_key" ON "App"("title");

-- CreateIndex
CREATE UNIQUE INDEX "App_path_key" ON "App"("path");

-- CreateIndex
CREATE UNIQUE INDEX "App_infoId_key" ON "App"("infoId");

-- CreateIndex
CREATE UNIQUE INDEX "_AppToSector_AB_unique" ON "_AppToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToSector_B_index" ON "_AppToSector"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AppToWorkstation_AB_unique" ON "_AppToWorkstation"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToWorkstation_B_index" ON "_AppToWorkstation"("B");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "AppInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToSector" ADD CONSTRAINT "_AppToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToSector" ADD CONSTRAINT "_AppToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToWorkstation" ADD CONSTRAINT "_AppToWorkstation_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToWorkstation" ADD CONSTRAINT "_AppToWorkstation_B_fkey" FOREIGN KEY ("B") REFERENCES "Workstation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
