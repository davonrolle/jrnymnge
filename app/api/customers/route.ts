import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Handle GET requests - Fetch customers for the current user
export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Query customers associated with the current user
    const customers = await prisma.customer.findMany({
      where: {
        userId: dbUser.id,
      },
      include: {
        Booking: {
          where: {
            userId: dbUser.id, // Add this to ensure bookings are also filtered
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            totalAmount: true,
            vehicleBooked: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform the data to include computed fields
    const transformedCustomers = customers.map((customer) => ({
      ...customer,
      totalBookings: customer.Booking.length,
      totalSpent: customer.Booking.reduce(
        (sum, booking) => sum + booking.totalAmount,
        0
      ),
    }));

    return NextResponse.json(transformedCustomers, { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// Handle POST requests - Create a new customer
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbUserRecord = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUserRecord) {
      // Create the user if they don't exist
      dbUserRecord = await prisma.user.create({
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
    if (!body) {
      return NextResponse.json(
        { error: "Request body cannot be empty" },
        { status: 400 }
      );
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, status } = parsedBody;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email" },
        { status: 400 }
      );
    }

    // Check if customer with same email already exists for this user
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        userId: dbUserRecord.id,
        email: email,
      },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "A customer with this email already exists" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        status,
        userId: dbUserRecord.id,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating customer:", error.message || error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A customer with similar details already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests - Delete a customer by ID
export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Get the database user
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    if (customer.userId !== dbUser.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this customer" },
        { status: 403 }
      );
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Customer deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "Error deleting customer:",
      err instanceof Error ? err.message : err
    );
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

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, status } = body;

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    if (customer.userId !== dbUser.id) {
      return NextResponse.json(
        { error: "Unauthorized to update this customer" },
        { status: 403 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        status,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
