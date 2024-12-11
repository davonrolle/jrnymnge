import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Handle GET requests - Fetch bookings for the current user
export async function GET() {
  try {
    const user = await currentUser(); // Get the current user from Clerk

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query bookings where the userId matches the user's Clerk ID
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch {
    console.error("Error fetching bookings");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle POST requests - Create a new booking
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read and parse the request body
    const body = await req.text();
    if (!body) {
      return NextResponse.json({ error: "Request body cannot be empty" }, { status: 400 });
    }

    let parsedBody: {
      vehicleId: string;
      vehicleBooked: string;
      startDate: string;
      endDate: string;
      totalAmount: number;
      pickupLocation?: string;
      dropoffLocation?: string;
      specialRequests?: string;
      insurance?: string;
      mileagePolicy?: string;
      fuelPolicy?: string;
      tempName?: string;
    };
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const {
      vehicleId,
      vehicleBooked,
      startDate,
      endDate,
      totalAmount,
      pickupLocation,
      dropoffLocation,
      specialRequests,
      insurance,
      mileagePolicy,
      fuelPolicy,
      tempName,
    } = parsedBody;

    // Validate required fields
    if (!vehicleId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        vehicleBooked,
        tempName,
        userId: user.id, // Use user.id to associate the booking with the user
        vehicleId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalAmount,
        pickupLocation: pickupLocation || "Not Provided",
        dropoffLocation: dropoffLocation || "Not Provided",
        specialRequests: specialRequests || null,
        insurance: insurance || null,
        mileagePolicy: mileagePolicy || null,
        fuelPolicy: fuelPolicy || null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating booking:", error?.message || err);

    if (error?.code === "P2002") {
      return NextResponse.json({ error: "A booking with similar details already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle DELETE requests - Delete a booking by ID
export async function DELETE(req: NextRequest) {
  try {
    // Check if the user is authenticated
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the booking ID from the query parameter
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // Check if the booking exists
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if the booking belongs to the user
    if (booking.userId !== user.id) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
  } catch {
    console.error("Error deleting booking.");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}