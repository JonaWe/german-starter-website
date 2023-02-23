import { useEffect, useRef } from 'react';

import autoAnimate from '@formkit/auto-animate';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import { auth, db } from '../../../firebase/clientApp';
import FavoritesCard from './FavoritesCard';

export default function Favorites() {
  const [user] = useAuthState(auth);
  const favRef = collection(db, 'users', user?.uid || 'invalid', 'favorites');

  const [favorites, loading, error] = useCollectionData(
    query(favRef, where('isFavorite', '==', true), orderBy('changedAt', 'desc'))
  );

  const scrollContainer = useScrollContainer();

  console.log(error);

  return (
    <div className="mb-5">
      {favorites && favorites?.length > 0 && user && (
        <>
          <h2>Bookmarks</h2>
          <ul
            ref={(node) => {
              scrollContainer.ref(node);
              if (!node) return;
              autoAnimate(node);
            }}
            className="flex gap-3 overflow-x-auto hover:scrollbar-thumb-background-600 snap-x scrollbar-thin pb-4"
          >
            {favorites.map((favorite) => (
              <FavoritesCard
                steamid={favorite.steamid}
                key={favorite.steamid}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
