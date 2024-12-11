/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `additionalInfo` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `engine` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `fuel` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `mileage` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `transmission` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropIndex
DROP INDEX "Vehicle_vin_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "additionalInfo",
DROP COLUMN "color",
DROP COLUMN "engine",
DROP COLUMN "features",
DROP COLUMN "fuel",
DROP COLUMN "mileage",
DROP COLUMN "rating",
DROP COLUMN "seats",
DROP COLUMN "transmission",
DROP COLUMN "vin",
ALTER COLUMN "status" SET DEFAULT 'available';

-- DropTable
DROP TABLE "Payment";
