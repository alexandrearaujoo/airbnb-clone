import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/actions/getCurrentUser';
import prismaClient from '@/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error('Sign up to continue');

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string')
      throw new Error('Invalid ID');

    const favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prismaClient.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error('Sign up to continue');

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string')
      throw new Error('Invalid ID');

    const favoriteIds = [...(currentUser.favoriteIds || [])];

    const newFavoritesIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prismaClient.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: newFavoritesIds }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 400 });
    }
  }
}
