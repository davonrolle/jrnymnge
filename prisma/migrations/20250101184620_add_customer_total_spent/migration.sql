-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tempEmail" TEXT,
ADD COLUMN     "tempPhone" TEXT;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "totalSpent" DOUBLE PRECISION NOT NULL DEFAULT 0;
