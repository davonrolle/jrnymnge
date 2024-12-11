import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      console.error("Error: SIGNING_SECRET is not set in .env or .env.local");
      return NextResponse.json(
        { error: "Signing secret is not configured" },
        { status: 500 }
      );
    }

    const wh = new Webhook(SIGNING_SECRET);

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
    }

    const rawBody = await req.text();
    let evt: WebhookEvent;

    try {
      evt = wh.verify(rawBody, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const { type, data } = evt;
    console.log(`Received event: ${type}`);

    switch (type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = data as {
          id: string;
          email_addresses?: { email_address: string }[];
          first_name?: string;
          last_name?: string;
        };

        const existingUser = await db.user.findUnique({
          where: { clerkId: id },
        });

        if (existingUser) {
          console.log(`User with ID ${id} already exists. Skipping creation.`);
          return NextResponse.json(
            { message: "User already exists, skipping creation." },
            { status: 200 }
          );
        }

        try {
          await db.user.create({
            data: {
              clerkId: id,
              email: email_addresses?.[0]?.email_address ?? "",
              firstName: first_name ?? "Unknown",
              lastName: last_name ?? "User",
            },
          });

          console.log(
            `User created: ${first_name ?? "Unknown"} ${
              last_name ?? "User"
            } (${email_addresses?.[0]?.email_address})`
          );
        } catch (err) {
          console.error("Error creating user in database:", err);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = data as {
          id: string;
          email_addresses?: { email_address: string }[];
          first_name?: string;
          last_name?: string;
        };

        try {
          await db.user.update({
            where: { clerkId: id },
            data: {
              email: email_addresses?.[0]?.email_address ?? "",
              firstName: first_name ?? "Unknown",
              lastName: last_name ?? "User",
            },
          });

          console.log(
            `User updated: ${first_name ?? "Unknown"} ${
              last_name ?? "User"
            } (${email_addresses?.[0]?.email_address})`
          );
        } catch (err) {
          console.error("Error updating user in database:", err);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        break;
      }

      case "user.deleted": {
        const { id } = data as { id: string };

        try {
          await db.user.delete({
            where: { clerkId: id },
          });

          console.log(`User deleted with Clerk ID: ${id}`);
        } catch (err) {
          console.error("Error deleting user in database:", err);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${type}`);
        break;
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unhandled error in webhook:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}