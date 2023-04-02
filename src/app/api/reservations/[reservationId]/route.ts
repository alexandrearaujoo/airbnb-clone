import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';

interface IParams {
  reservationId?: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Sign in to continue');
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string')
      throw new Error('Invalid ID');

    await prismaClient.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      }
    });
    return NextResponse.json('', { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 400 });
  }
}
