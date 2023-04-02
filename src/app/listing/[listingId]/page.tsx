import EmptyState from '@/components/EmptyState';

import ListingClient from './ListingClient';

import { getCurrentUser } from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById({ params });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div className="">
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
}
