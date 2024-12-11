// app/api/donate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Create a new donation (POST)
export async function POST(req: NextRequest) {
  const { name, email, amount, transactionId } = await req.json();

  // Validate the request body
  if (!name || !email || !amount || !transactionId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newDonation = await db.donation.create({
      data: {
        name,
        email,
        amount: parseFloat(amount), // Ensure amount is a float
        transactionId,
      },
    });

    return NextResponse.json(newDonation, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 });
  }
}

// Get all donations or a specific donation by ID (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  // If an ID is provided, fetch that specific donation
  if (id) {
    try {
      const donation = await db.donation.findUnique({
        where: { id },
      });

      if (!donation) {
        return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
      }

      return NextResponse.json(donation, { status: 200 });
    } catch (error) {
      console.error('Error fetching donation by ID:', error);
      return NextResponse.json({ error: 'Failed to fetch donation' }, { status: 500 });
    }
  } else {
    // If no ID is provided, fetch all donations
    try {
      const donations = await db.donation.findMany();
      return NextResponse.json(donations, { status: 200 });
    } catch (error) {
      console.error('Error fetching donations:', error);
      return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
    }
  }
}

// Update a donation (PUT)
export async function PUT(req: NextRequest) {
  const { id, name, email, amount, transactionId } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Donation ID is required for update' }, { status: 400 });
  }

  try {
    const updatedDonation = await db.donation.update({
      where: { id },
      data: {
        name,
        email,
        amount: parseFloat(amount), // Ensure amount is a float
        transactionId,
      },
    });

    return NextResponse.json(updatedDonation, { status: 200 });
  } catch (error) {
    console.error('Error updating donation:', error);
    return NextResponse.json({ error: 'Failed to update donation' }, { status: 500 });
  }
}

// Delete a donation (DELETE)
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Donation ID is required for deletion' }, { status: 400 });
  }

  try {
    await db.donation.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Donation deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting donation:', error);
    return NextResponse.json({ error: 'Failed to delete donation' }, { status: 500 });
  }
}