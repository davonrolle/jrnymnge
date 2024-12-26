import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendWaitlistNotification } from "@/lib/email";

// Utility function for parsing JSON
const parseBody = async (req: NextRequest) => {
  try {
    return await req.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
};

// CREATE
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await parseBody(req);

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingEntry = await db.waitlist.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Email or phone number already exists" },
        { status: 400 }
      );
    }

    const waitlistEntry = await db.waitlist.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    // Send email notification
    try {
      await sendWaitlistNotification({ firstName, lastName, email, phone });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't return error here - we still want to return success even if email fails
    }

    return NextResponse.json(waitlistEntry, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create waitlist entry" },
      { status: 500 }
    );
  }
}

// READ ALL
export async function GET() {
  try {
    const waitlist = await db.waitlist.findMany();
    return NextResponse.json(waitlist, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch waitlist entries" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PATCH(req: NextRequest) {
  try {
    const { id, firstName, lastName, email, phone } = await parseBody(req);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existingEntry = await db.waitlist.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [{ email }, { phone }],
          },
        ],
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Email or phone number already exists" },
        { status: 400 }
      );
    }

    const updatedEntry = await db.waitlist.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    return NextResponse.json(updatedEntry, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update waitlist entry" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await parseBody(req);

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.waitlist.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Waitlist entry deleted" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete waitlist entry" },
      { status: 500 }
    );
  }
}
