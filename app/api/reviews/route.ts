import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// POST: Create a review
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, review, vehicleId } = body;

    if (!rating || !vehicleId) {
      return NextResponse.json(
        { message: "Rating and vehicleId are required." },
        { status: 400 }
      );
    }

    const createdReview = await prisma.review.create({
      data: {
        rating,
        review,
        vehicleId,
        reviewerId: user.id,
        reviewerType: "User",
      },
    });

    return NextResponse.json(createdReview, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating review:", errorMessage);
    return NextResponse.json(
      { message: "Error creating review", error: errorMessage },
      { status: 500 }
    );
  }
}

// GET: Retrieve all reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        vehicle: {
          select: {
            make: true,
            model: true,
          },
        },
      },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error retrieving reviews:", errorMessage);
    return NextResponse.json(
      { message: "Error retrieving reviews", error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT: Update a review by ID
export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Review ID is required." },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review || review.reviewerId !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized to update this review." },
        { status: 403 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error updating review:", errorMessage);
    return NextResponse.json(
      { message: "Error updating review", error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: Delete a review by ID
export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Review ID is required." },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review || review.reviewerId !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized to delete this review." },
        { status: 403 }
      );
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Review deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error deleting review:", errorMessage);
    return NextResponse.json(
      { message: "Error deleting review", error: errorMessage },
      { status: 500 }
    );
  }
}