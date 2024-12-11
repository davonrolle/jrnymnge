import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Booking } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings: Booking[] = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    }: {
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
    } = await req.json();

    if (!vehicleId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let customerId: string | undefined = undefined;

    const customer = await prisma.customer.findFirst({
      where: { userId: user.id },
    });

    if (customer) {
      customerId = customer.id;
    }

    const booking: Booking = await prisma.booking.create({
      data: {
        vehicleBooked,
        tempName,
        customerId,
        vehicleId,
        userId: user.id,
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
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookingId = req.nextUrl.searchParams.get("id");

    if (!bookingId || typeof bookingId !== "string") {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.userId !== user.id) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}