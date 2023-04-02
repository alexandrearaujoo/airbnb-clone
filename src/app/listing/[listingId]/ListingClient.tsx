'use client';

import { useMemo } from 'react';

import Container from '@/components/Container';
import ListingHead from '@/components/Listings/ListingHead';
import ListingInfo from '@/components/Listings/ListingInfo';

import { categories } from '@/data/categories';
import { SafeListing, SafeReservation, SafeUser } from '@/types';

interface ListingClienProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient = ({
  currentUser,
  listing,
  reservations
}: ListingClienProps) => {
  const category = useMemo(() => {
    return categories.find(({ label }) => label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
