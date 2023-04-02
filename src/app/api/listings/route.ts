import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Sign in to continue');
    }
    const body = await req.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price
    } = body;

    Object.keys(body).forEach((value) => {
      if (!body[value]) {
        throw new Error('Fill in the required fields');
      }
    });

    const listing = await prismaClient.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id
      }
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 400 });
  }
}
