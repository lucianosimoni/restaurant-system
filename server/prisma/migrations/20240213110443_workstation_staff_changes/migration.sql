/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `Workstation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workstation" DROP COLUMN "passwordHash",
ADD COLUMN     "authenticatedByStaffId" INTEGER,
ADD COLUMN     "previouslyAuthenticatedByStaffId" INTEGER,
ADD COLUMN     "staffId" INTEGER;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_authenticatedByStaffId_fkey" FOREIGN KEY ("authenticatedByStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_previouslyAuthenticatedByStaffId_fkey" FOREIGN KEY ("previouslyAuthenticatedByStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workstation" ADD CONSTRAINT "Workstation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
