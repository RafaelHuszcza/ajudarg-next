/*
  Warnings:

  - Made the column `imageUrl` on table `Animal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localId` on table `Animal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_localId_fkey";

-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "localId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
