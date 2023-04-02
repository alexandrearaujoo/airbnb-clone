import prismaClient from '@/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listingId = { userId: authorId };
    }

    const reservations = await prismaClient.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
