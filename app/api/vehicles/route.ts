import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

// Define the update schema
const updateVehicleSchema = z.object({
  id: z.string(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional(),
  dailyRate: z.number().positive().optional(),
  licensePlate: z.string().optional().nullable(),
  status: z.enum(["Available", "Rented", "Maintenance"]).optional(),
});

type UpdateVehicleData = z.infer<typeof updateVehicleSchema>;

// Handle GET requests - Fetch vehicles for the current user
export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Remove status filter to show all vehicles owned by the user
    const vehicles = await db.vehicle.findMany({
      where: {
        ownerId: dbUser.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/vehicles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle POST requests - Create a new vehicle
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First, find the user in your database using their Clerk ID
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Read and parse the request body
    const body = await req.text();
    if (!body) {
      return NextResponse.json(
        { error: "Request body cannot be empty" },
        { status: 400 }
      );
    }

    let parsedBody: {
      make: string;
      model: string;
      year: number;
      dailyRate: number;
      licensePlate?: string;
      status?: string;
    };
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { make, model, year, dailyRate, licensePlate, status } = parsedBody;

    // Validate required fields
    if (!make || !model || !year || !dailyRate) {
      return NextResponse.json(
        { error: "Missing required fields: make, model, year, dailyRate" },
        { status: 400 }
      );
    }

    // Create the vehicle using the database User ID, not the Clerk ID
    const vehicle = await db.vehicle.create({
      data: {
        make,
        model,
        year,
        dailyRate,
        licensePlate,
        status: status || "Available",
        ownerId: dbUser.id, // Use the database User ID here
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating vehicle:", error?.message || err);

    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A vehicle with similar details already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
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

    return NextResponse.json(
      { message: "Vehicle deleted successfully" },
      { status: 200 }
    );
  } catch {
    console.error("Error deleting vehicle.");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Add this to your existing route.ts file
export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: UpdateVehicleData = await req.json();

    // Validate the update data
    const validatedData = updateVehicleSchema.parse(data);
    const { id, ...updateData } = validatedData;

    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    // Get the user's database ID
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the vehicle belongs to the user
    const vehicle = await db.vehicle.findFirst({
      where: {
        id: id,
        ownerId: dbUser.id,
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the vehicle
    const updatedVehicle = await db.vehicle.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data format", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
