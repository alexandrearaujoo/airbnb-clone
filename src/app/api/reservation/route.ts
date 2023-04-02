import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Sign in to continue');
    }

    const { listingId, startDate, endDate, totalPrice } = await req.json();

    if (!listingId || !startDate || !endDate || !totalPrice) {
      throw new Error('Fill in the required fields');
    }

    const listingAndReservation = await prismaClient.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            endDate,
            startDate,
            totalPrice
          }
        }
      }
    });

    return NextResponse.json(listingAndReservation, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 400 });
  }
}
