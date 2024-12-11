/*
  Warnings:

  - Added the required column `vehicleBooked` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "vehicleBooked" TEXT NOT NULL;
