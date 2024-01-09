/*
  Warnings:

  - Added the required column `passwordHash` to the `Workstation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workstation" ADD COLUMN     "passwordHash" TEXT NOT NULL;
