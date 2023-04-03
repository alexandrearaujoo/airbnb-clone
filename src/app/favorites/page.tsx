import EmptyState from '@/components/EmptyState';

import FavoritesClient from './FavoritesClient';

import { getCurrentUser } from '@/actions/getCurrentUser';
import { getFavorites } from '@/actions/getFavorites';

export const metadata = {
  title: 'Favorites',
  description: 'My favorites places'
};

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Books you live have no favorites listings"
      />
    );
  }

  return <FavoritesClient favorites={favorites} currentUser={currentUser} />;
}
