import { HiBadgeCheck } from 'react-icons/hi';

import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';

interface NewsCommentProps {
  uid: string;
  comment: string;
  date: string;
}

export default function NewsComment({ uid, date, comment }: NewsCommentProps) {
  const [user] = usePublicUser(uid);
  const [steamUser] = useSteamUser(user?.steamid);

  console.log(steamUser);

  return (
    <div className="flex gap-2">
      <img
        src={steamUser ? steamUser.avatar.medium : user?.photoURL}
        alt="avatar"
        className="aspect-square w-12"
      />
      <div>
        <div className="flex items-end gap-3">
          <span className="flex items-center gap-1">
            <p className="font-bold leading-none">
              {steamUser ? steamUser.nickname : user?.displayName}
            </p>
            {steamUser && (
              <HiBadgeCheck className="fill-blue-600 inline text-xl" />
            )}
          </span>
          <span className="text-xs font-thin">
              long time ago
          </span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}
