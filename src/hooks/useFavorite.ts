import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { useLoginModal } from './useLoginModal';

import { SafeUser } from '@/types';
import axios, { AxiosError } from 'axios';

interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.patch(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};
