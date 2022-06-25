import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { HiEmojiSad, HiOutlineEmojiSad } from 'react-icons/hi';

import { db } from '../../../../firebase/clientApp';
import useSteamUser from '../../../../hooks/useSteamUser';
import LinkedAccount from '../../../User/UserSettings/LinkedAccount';

export default function UserPageSteamInfo({ uid }: { uid: string }) {
  console.log(uid);

  const userRef = doc(db, 'users', uid);
  const [userData, error] = useDocumentData(userRef);

  const [steamUser] = useSteamUser(userData?.settings.steamid);

  console.log(steamUser);

  return (
    <div>
      <h3 className="font-sans font-semibold mt-3 mb-1">Linked account</h3>
      {steamUser ? (
        <>
          <LinkedAccount steamUser={steamUser} editable={false} />
        </>
      ) : (
        <span className="flex items-center gap-2">
          <HiOutlineEmojiSad className='stroke-background-400 text-xl' />
          <p className='text-background-400'>no account linked</p>
        </span>
      )}
    </div>
  );
}
