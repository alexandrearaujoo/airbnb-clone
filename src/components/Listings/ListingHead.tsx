'use client';

import Image from 'next/image';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

import { useCountries } from '@/hooks/useCountries';
import { SafeUser } from '@/types';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt={title}
          src={imageSrc}
          className="object-cover w-full"
          fill
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
