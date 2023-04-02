'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import ListingHead from '@/components/Listings/ListingHead';
import ListingInfo from '@/components/Listings/ListingInfo';
import ListingReservation from '@/components/Listings/ListingReservation';

import { categories } from '@/data/categories';
import { useLoginModal } from '@/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import axios, { AxiosError } from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

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
  reservations = []
}: ListingClienProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      setIsLoading(true);

      await axios.post('/api/reservation', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      });
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.push('/trips');
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        setIsLoading(false);
      }
    }
  }, [totalPrice, currentUser, dateRange, listing?.id, router, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [listing.price, dateRange]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
