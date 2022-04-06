import { useRouter } from 'next/router';

import { Timestamp } from 'firebase/firestore';
import { HiBadgeCheck } from 'react-icons/hi';

import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';
import Tooltip from '../../UI/Tooltip';

interface NewsCommentProps {
  uid: string;
  comment: string;
  date: Timestamp;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'long',
  timeStyle: 'short',
};

export default function NewsComment({ uid, date, comment }: NewsCommentProps) {
  const [user] = usePublicUser(uid);
  const [steamUser] = useSteamUser(user?.steamid);

  const { locale } = useRouter();

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
              <Tooltip text="Verified Steam Account">
                <HiBadgeCheck className="fill-blue-600 inline text-xl" />
              </Tooltip>
            )}
          </span>
          <span className="text-xs font-thin">
            {date.toDate().toLocaleString(locale, dateFormatOptions)}
          </span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}
