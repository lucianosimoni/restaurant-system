/*
  Warnings:

  - You are about to drop the `_SectorToWorkstation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SectorToWorkstation" DROP CONSTRAINT "_SectorToWorkstation_A_fkey";

-- DropForeignKey
ALTER TABLE "_SectorToWorkstation" DROP CONSTRAINT "_SectorToWorkstation_B_fkey";

-- DropTable
DROP TABLE "_SectorToWorkstation";

-- CreateTable
CREATE TABLE "_SectorToWorkstationSetting" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SectorToWorkstationSetting_AB_unique" ON "_SectorToWorkstationSetting"("A", "B");

-- CreateIndex
CREATE INDEX "_SectorToWorkstationSetting_B_index" ON "_SectorToWorkstationSetting"("B");

-- AddForeignKey
ALTER TABLE "_SectorToWorkstationSetting" ADD CONSTRAINT "_SectorToWorkstationSetting_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToWorkstationSetting" ADD CONSTRAINT "_SectorToWorkstationSetting_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkstationSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
