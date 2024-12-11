/*
  Warnings:

  - You are about to drop the column `available` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vin]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seats` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "available",
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "engine" TEXT,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "fuel" TEXT,
ADD COLUMN     "images" JSONB,
ADD COLUMN     "mileage" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "seats" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "transmission" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");
