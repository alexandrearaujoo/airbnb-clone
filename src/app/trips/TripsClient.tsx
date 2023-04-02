'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/Listings/ListingCard';

import { SafeReservation, SafeUser } from '@/types';
import axios, { AxiosError } from 'axios';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);

        await axios.delete(`/api/reservations/${id}`);
        toast.success('Reservation cancelled');
        router.refresh();
        setDeletingId('');
      } catch (error) {
        if (error instanceof AxiosError) {
          setDeletingId('');
          toast.error(error.response?.data);
        }
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
