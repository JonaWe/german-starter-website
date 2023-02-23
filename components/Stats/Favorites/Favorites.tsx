import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useScrollContainer } from 'react-indiana-drag-scroll';

import { auth, db } from '../../../firebase/clientApp';
import FavoritesCard from './FavoritesCard';

export default function Favorites() {
  const [user] = useAuthState(auth);
  const favRef = collection(db, 'users', user?.uid || 'invalid', 'favorites');

  const [favorites] = useCollectionData(
    query(favRef, where('isFavorite', '==', true))
  );

  const scrollContainer = useScrollContainer();

  console.log(favorites);

  return (
    <div className="mb-5">
      {favorites && favorites?.length > 0 && user && (
        <>
          <h2>Bookmarks</h2>
          <ul
            ref={scrollContainer.ref}
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
