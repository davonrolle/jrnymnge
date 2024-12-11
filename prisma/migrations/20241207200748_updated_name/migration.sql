/*
  Warnings:

  - You are about to drop the column `tempFirstName` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "tempFirstName",
ADD COLUMN     "tempName" TEXT;
