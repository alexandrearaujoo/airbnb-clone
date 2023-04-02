import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';

interface IParams {
  listingId?: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Sign in to continue');
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string')
      throw new Error('Invalid ID');

    await prismaClient.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id
      }
    });
    return NextResponse.json('', { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 400 });
  }
}
