'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

import { useCountries } from '@/hooks/useCountries';
import { SafeUser } from '@/types';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category?: {
    label: string;
    icon: IconType;
    description: string;
  };
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user
}: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <h1>Hosted by {user?.name}</h1>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms </p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
