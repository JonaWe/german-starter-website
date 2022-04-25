import { useRouter } from 'next/router';

import Filter from 'bad-words';
import { Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiBadgeCheck, HiDotsVertical } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { auth } from '../../../firebase/clientApp';
import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';
import WithLink from '../../OptionalLink';
import Avatar from '../../UI/Avatar';
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

const filter = new Filter();

export default function NewsComment({ uid, date, comment }: NewsCommentProps) {
  const [user] = usePublicUser(uid);
  const [steamUser] = useSteamUser(user?.steamid);
  const [currentUser] = useAuthState(auth);

  const link = user
    ? `https://playerstats.german-starter.de/player?playerid=${user.steamid}`
    : '';

  const { locale } = useRouter();

  return (
    <div className="mb-6 flex justify-between items-center group hover:bg-background-150/10">
      <div className="flex gap-2">
        <Avatar
          className="w-12 h-12"
          url={steamUser ? steamUser.avatar.medium : user?.photoURL}
        />
        <div>
          <div className="flex items-end gap-3">
            <span className="flex items-center gap-1">
              <WithLink link={link} className="cursor-pointer">
                <p className="font-bold leading-none">
                  {steamUser
                    ? steamUser.nickname
                    : user?.displayName || <Skeleton />}
                </p>
              </WithLink>
              {steamUser && (
                <Tooltip text="Verified Steam Account">
                  <HiBadgeCheck className="fill-blue-600 inline text-xl" />
                </Tooltip>
              )}
            </span>
            <span className="text-xs font-thin">
              {date?.toDate().toLocaleString(locale, dateFormatOptions)}
            </span>
          </div>
          <p>{filter.clean(comment)}</p>
        </div>
      </div>
      {currentUser?.uid === uid && (
        <button>
          <HiDotsVertical className="group-hover:opacity-40 opacity-0 text-lg hover:opacity-100 transition-opacity mr-2" />
        </button>
      )}
    </div>
  );
}
