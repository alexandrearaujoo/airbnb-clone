'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/Listings/ListingCard';

import { SafeReservation, SafeUser } from '@/types';
import axios, { AxiosError } from 'axios';

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient = ({
  reservations,
  currentUser
}: ReservationsClientProps) => {
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
