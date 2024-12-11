import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// Handle GET requests - Fetch vehicles for the current user
export async function GET() {
  try {
    const user = await currentUser(); // Get the current user from Clerk

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query vehicles where the ownerId matches the user's Clerk ID
    const vehicles = await db.vehicle.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(vehicles, { status: 200 });
  } catch {
    console.error("Error fetching vehicles");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle POST requests - Create a new vehicle
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

    let parsedBody: { make: string; model: string; year: number; dailyRate: number; status?: string };
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { make, model, year, dailyRate, status } = parsedBody;

    // Validate required fields
    if (!make || !model || !year || !dailyRate) {
      return NextResponse.json({ error: "Missing required fields: make, model, year, dailyRate" }, { status: 400 });
    }

    // Create the vehicle
    const vehicle = await db.vehicle.create({
      data: {
        make,
        model,
        year,
        dailyRate,
        status: status || "Available",
        ownerId: user.id, // Use user.id to associate the vehicle with the user
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating vehicle:", error?.message || err);

    if (error?.code === "P2002") {
      return NextResponse.json({ error: "A vehicle with similar details already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle DELETE requests - Delete a vehicle by ID
export async function DELETE(req: NextRequest) {
  try {
    // Check if the user is authenticated
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the vehicle ID from the query parameter
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 });
    }

    // Check if the vehicle exists
    const vehicle = await db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    // Delete the vehicle
    await db.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Vehicle deleted successfully" }, { status: 200 });
  } catch {
    console.error("Error deleting vehicle.");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}