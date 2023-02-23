import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import { HiOutlineBookmark } from 'react-icons/hi';

import { auth, db } from '../../../firebase/clientApp';

export default function FavoriteButton({ steamid }: { steamid: string }) {
  const [user] = useAuthState(auth);
  const favRef = collection(
    db,
    'users',
    user?.uid || 'invalid',
    'favorites'
  );
  const favQuery = query(favRef, where('steamid', '==', steamid));

  const [favorites] = useCollectionData(favQuery);
  const favorite = favorites?.[0];

  const toggleFav = async () => {
    await setDoc(doc(favRef, steamid), {
      steamid,
      isFavorite: !favorite?.isFavorite,
    });
  };

  return (
    <button
      onClick={toggleFav}
      className="flex gap-1 border-background-200/30 bg-background-200/10 rounded-lg px-3 py-1 border-2 group font-sans items-center"
    >
      <HiOutlineBookmark
        className={`text-xl transition-all group-hover:scale-95 group-active:scale-90 scale-100 ${
          favorite?.isFavorite ? 'fill-sand-500' : 'fill-sand-500/0'
        }`}
      />
      {favorite?.isFavorite ? 'Marked' : 'Mark'}
    </button>
  );
}
