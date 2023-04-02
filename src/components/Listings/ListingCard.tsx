'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useMemo } from 'react';

import Button from '../Button';
import HeartButton from '../HeartButton';

import { useCountries } from '@/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { format } from 'date-fns';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
  data,
  currentUser,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, actionId, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt={data.title}
            src={data.imageSrc}
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <h1 className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </h1>
        <h2 className="font-light text-neutral-500">
          {reservationDate || data.category}
        </h2>
        <div className="flex items-center gap-1">
          <p className="font-semibold"> $ {price}</p>
          {!reservation && <p className="font-light">night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
