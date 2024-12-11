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

    // Query customers where the userId matches the user's Clerk ID
    const customers = await prisma.customer.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.error("Error fetching customers:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle POST requests - Create a new customer
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.text();
    if (!body) {
      return NextResponse.json({ error: "Request body cannot be empty" }, { status: 400 });
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { firstName, lastName, email, phone } = parsedBody;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields: firstName, lastName, email" }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        userId: user.id,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.error("Error creating customer:", error.message || error);

    if (error.code === "P2002") {
      return NextResponse.json({ error: "A customer with similar details already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    if (customer.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this customer" }, { status: 403 });
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting customer:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}