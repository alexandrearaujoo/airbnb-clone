import EmptyState from '@/components/EmptyState';

import PropertiesClient from './PropertiesClient';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListings } from '@/actions/getListings';

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
}
