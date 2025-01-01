import { db } from "@/lib/db";

export async function updateCustomerStatus(customerId: string) {
  try {
    // Get customer's bookings
    const customer = await db.customer.findUnique({
      where: { id: customerId },
      include: {
        Booking: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!customer) return;

    const bookings = customer.Booking;
    const totalBookings = bookings.length;

    // Calculate total rental duration in days
    const totalRentalDays = bookings.reduce((total, booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return total + days;
    }, 0);

    // Determine new status
    let newStatus = customer.status;

    if (totalBookings >= 5 || totalRentalDays >= 30) {
      newStatus = "VIP";
    } else if (totalBookings > 0) {
      newStatus = "Active";
    }

    // Update customer status and totalBookings
    if (
      newStatus !== customer.status ||
      customer.totalBookings !== totalBookings
    ) {
      await db.customer.update({
        where: { id: customerId },
        data: {
          status: newStatus,
          totalBookings: totalBookings,
        },
      });
    }

    return { status: newStatus, totalBookings };
  } catch (error) {
    console.error("Error updating customer status:", error);
    throw error;
  }
}
