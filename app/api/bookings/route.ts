import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { addDays } from "date-fns";
import { updateCustomerStatus } from "@/app/dashboard/customers/customerStatus";

const prisma = new PrismaClient();

// Handle GET requests - Fetch bookings for the current user
export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const isNotifications =
      req.nextUrl.searchParams.get("notifications") === "true";
    const bookingId = req.nextUrl.searchParams.get("id");

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's database ID
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If a specific booking ID is provided, return that booking's details
    if (bookingId) {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId: dbUser.id,
        },
        include: {
          vehicle: {
            select: {
              make: true,
              model: true,
              year: true,
              dailyRate: true,
            },
          },
          customer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      if (!booking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(booking);
    }

    // If this is a notifications request, return only upcoming bookings within 5 days
    if (isNotifications) {
      const upcomingBookings = await prisma.booking.findMany({
        where: {
          userId: dbUser.id,
          startDate: {
            gte: new Date(),
            lte: addDays(new Date(), 5),
          },
        },
        include: {
          vehicle: {
            select: {
              make: true,
              model: true,
              year: true,
              dailyRate: true,
            },
          },
          customer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          startDate: "asc",
        },
      });

      return NextResponse.json(upcomingBookings, { status: 200 });
    }

    // Original GET logic for all bookings
    const bookings = await prisma.booking.findMany({
      where: {
        userId: dbUser.id,
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            year: true,
            dailyRate: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle POST requests - Create a new booking
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create the database user
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          imageUrl: user.imageUrl || "",
        },
      });
    }

    const body = await req.text();
    const parsedBody = JSON.parse(body);

    // Check if vehicle is available before booking
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parsedBody.vehicleId },
    });

    if (!vehicle || vehicle.status !== "Available") {
      return NextResponse.json(
        { error: "Vehicle is not available for booking" },
        { status: 400 }
      );
    }

    // Create the booking with the user's ID
    const booking = await prisma.booking.create({
      data: {
        vehicleBooked: parsedBody.vehicleBooked,
        tempName: parsedBody.tempName,
        tempEmail: parsedBody.tempEmail,
        tempPhone: parsedBody.tempPhone,
        userId: dbUser.id,
        vehicleId: parsedBody.vehicleId,
        startDate: new Date(parsedBody.startDate),
        endDate: new Date(parsedBody.endDate),
        totalAmount: parsedBody.totalAmount,
        pickupLocation: parsedBody.pickupLocation || "Not Provided",
        dropoffLocation: parsedBody.dropoffLocation || "Not Provided",
        specialRequests: parsedBody.specialRequests || null,
        insurance: parsedBody.insurance || null,
        mileagePolicy: parsedBody.mileagePolicy || null,
        fuelPolicy: parsedBody.fuelPolicy || null,
        ...(parsedBody.customerId && { customerId: parsedBody.customerId }),
      },
    });

    // If there's a customer ID, update their statistics
    if (parsedBody.customerId) {
      await prisma.$transaction([
        prisma.customer.update({
          where: { id: parsedBody.customerId },
          data: {
            totalBookings: {
              increment: 1,
            },
          },
        }),
        prisma.customer.update({
          where: { id: parsedBody.customerId },
          data: {
            totalSpent: {
              increment: parseFloat(parsedBody.totalAmount),
            },
          },
        }),
      ]);
    }

    // Update vehicle status to "Rented" when booking is created
    await prisma.vehicle.update({
      where: { id: parsedBody.vehicleId },
      data: { status: "Rented" },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating booking:", error?.message || err);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A booking with similar details already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests - Delete a booking by ID
export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the booking ID from the query parameter
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Get the user's database ID
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the booking exists and belongs to the user
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
        userId: dbUser.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id },
    });

    // Update customer statistics if applicable
    if (booking?.customerId) {
      await prisma.customer.update({
        where: { id: booking.customerId },
        data: {
          totalBookings: { decrement: 1 },
          totalSpent: { decrement: booking.totalAmount },
        },
      });
    }

    // Update vehicle status back to "Available" when booking is deleted
    if (booking?.vehicleId) {
      await prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { status: "Available" },
      });
    }

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Get the user's database ID
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the booking belongs to the user
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
        userId: dbUser.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the booking with all fields
    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: {
        startDate: new Date(updateData.startDate),
        endDate: new Date(updateData.endDate),
        pickupLocation: updateData.pickupLocation,
        dropoffLocation: updateData.dropoffLocation,
        specialRequests: updateData.specialRequests,
        insurance: updateData.insurance,
        mileagePolicy: updateData.mileagePolicy,
        fuelPolicy: updateData.fuelPolicy,
        totalAmount: updateData.totalAmount,
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            year: true,
          },
        },
      },
    });

    // Update customer status after booking modification
    if (updatedBooking.customerId) {
      await updateCustomerStatus(updatedBooking.customerId);
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
