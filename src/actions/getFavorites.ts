import { getCurrentUser } from './getCurrentUser';

import prismaClient from '@/libs/prismadb';

export const getFavorites = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await prismaClient.listing.findMany({
      where: { id: { in: [...(currentUser.favoriteIds || [])] } }
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString()
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
