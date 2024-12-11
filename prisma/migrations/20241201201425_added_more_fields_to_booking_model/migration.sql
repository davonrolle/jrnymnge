-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "dropoffLocation" TEXT NOT NULL DEFAULT 'Not Provided',
ADD COLUMN     "fuelPolicy" TEXT,
ADD COLUMN     "insurance" TEXT,
ADD COLUMN     "mileagePolicy" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "pickupLocation" TEXT NOT NULL DEFAULT 'Not Provided',
ADD COLUMN     "specialRequests" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
