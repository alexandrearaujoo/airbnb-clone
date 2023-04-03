import EmptyState from '@/components/EmptyState';

import ListingClient from './ListingClient';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListingById } from '@/actions/getListingById';
import { getReservations } from '@/actions/getReservations';

interface IParams {
  listingId?: string;
}

export async function generateMetadata({ params }: { params: IParams }) {
  const listing = await getListingById({ params });
  return { title: listing?.title };
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById({ params });
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
}
