-- CreateTable
CREATE TABLE "NewNeed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "localId" TEXT,

    CONSTRAINT "NewNeed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewNeed" ADD CONSTRAINT "NewNeed_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE SET NULL ON UPDATE CASCADE;
