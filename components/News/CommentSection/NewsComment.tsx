import { useRouter } from 'next/router';

import Filter from 'bad-words';
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast, { Toast, Toaster } from 'react-hot-toast';
import {
  HiBadgeCheck,
  HiCheckCircle,
  HiDotsVertical,
  HiEmojiSad,
  HiTrash,
} from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { auth, db } from '../../../firebase/clientApp';
import useAdmin from '../../../hooks/useAdmin';
import useLocalization from '../../../hooks/useLocalization';
import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';
import deleteComment from '../../../lib/firebase/deleteDocByPath';
import BasicMenu from '../../Menu';
import { Option } from '../../Menu/MenuPopout';
import WithLink from '../../OptionalLink';
import Avatar from '../../UI/Avatar';
import CustomInfoToast from '../../UI/Toaster/CustomInfoToast';
import Tooltip from '../../UI/Tooltip';

interface NewsCommentProps {
  uid: string;
  comment: string;
  date: Timestamp;
  path: string;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'long',
  timeStyle: 'short',
};

const filter = new Filter();

const reportComment = async (
  path: string,
  comment: string,
  successText: string
) => {
  const ticketsRef = collection(db, 'tickets');

  await addDoc(ticketsRef, {
    author: auth.currentUser?.uid,
    description: `Comment reported by user: "${comment}"`,
    reason: path,
    createdAt: serverTimestamp(),
    type: 'COMMENT_REPORT',
  });

  toast(
    (t: Toast) => (
      <CustomInfoToast t={t}>
        <HiCheckCircle className="fill-green-500 text-xl" />
        {successText}
      </CustomInfoToast>
    ),
    {
      style: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: 0,
      },
    }
  );
};

export default function NewsComment({
  uid,
  date,
  comment,
  path,
}: NewsCommentProps) {
  const [user] = usePublicUser(uid);
  const [steamUser] = useSteamUser(user?.steamid);
  const [currentUser] = useAuthState(auth);
  const [admin] = useAdmin(currentUser ?? null);

  const t = useLocalization();

  const options = [
    {
      labelCell: (
        <span className="flex items-center gap-1">
          <HiTrash className="-translate-y-0.5" />
          {t.from.general.delete}
        </span>
      ),
      onClick: () => deleteComment(path),
    },
    {
      labelCell: (
        <span className="flex items-center gap-1">
          <HiEmojiSad className="-translate-y-0.5" />
          {t.support.report.report}
        </span>
      ),
      onClick: () => reportComment(path, comment, t.support.report.thanks),
    },
  ] as Option[];

  const link = user
    ? `https://playerstats.german-starter.de/player?playerid=${user.steamid}`
    : '';

  const { locale } = useRouter();

  return (
    <div className="mb-6 flex justify-between items-center group hover:bg-background-150/10">
      <Toaster position="bottom-right" />
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
      {(currentUser?.uid === uid || admin) && (
        <div className="group-hover:opacity-100 opacity-0">
          <BasicMenu options={options}>
            <HiDotsVertical className="group-hover:opacity-40 opacity-0 text-lg hover:opacity-100 transition-opacity mr-2" />
          </BasicMenu>
        </div>
      )}
    </div>
  );
}
