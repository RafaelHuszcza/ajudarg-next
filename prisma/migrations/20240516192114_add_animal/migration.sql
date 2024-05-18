/*
  Warnings:

  - You are about to drop the column `meals` on the `Local` table. All the data in the column will be lost.
  - You are about to drop the `NewNeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NewNeed" DROP CONSTRAINT "NewNeed_localId_fkey";

-- AlterTable
ALTER TABLE "Local" DROP COLUMN "meals",
ADD COLUMN     "isAnimalShelter" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "NewNeed";

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT,
    "localId" TEXT,
    "tag" TEXT,
    "breed" TEXT,
    "specie" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;
