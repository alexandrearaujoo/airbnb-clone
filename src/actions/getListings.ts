import prismaClient from '@/libs/prismadb';

export interface IListingParams {
  userId?: string;
}

export const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;

    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prismaClient.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    });

    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));
  } catch (error: any) {
    throw new Error(error);
  }
};
