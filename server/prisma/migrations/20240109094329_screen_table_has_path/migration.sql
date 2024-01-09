/*
  Warnings:

  - You are about to drop the column `path` on the `ScreenInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Screen` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ScreenInfo_path_key";

-- AlterTable
ALTER TABLE "Screen" ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScreenInfo" DROP COLUMN "path";

-- CreateIndex
CREATE UNIQUE INDEX "Screen_path_key" ON "Screen"("path");
