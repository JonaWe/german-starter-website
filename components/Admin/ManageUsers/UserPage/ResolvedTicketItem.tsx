import Link from 'next/link';

import usePublicUser from '../../../../hooks/usePublicUser';
import Avatar from '../../../UI/Avatar';

interface ResolvedTicketItemProps {
  author: string;
  time: string;
  message: string;
  id: string;
}

export default function ResolvedTicketItem({
  author,
  time,
  message,
  id,
}: ResolvedTicketItemProps) {
  const [user] = usePublicUser(author);

  return (
    <li className="bg-background-400 mb-5 py-3 px-5 hover:-translate-y-1 transition-all cursor-pointer hover:shadow-lg w-full">
      <Link href={`/admin/reports/${id}`}>
        <a>
          <span className="flex justify-between gap-4 items-baseline mb-2 border-b border-background-150 pb-1">
            <span className="flex items-center gap-2 overflow-hidden">
              <Avatar className="w-8" url={user?.photoURL} />
              <p className="truncate">{user?.displayName}</p>
            </span>
            <p className="flex-none text-sm opacity-70">{time}</p>
          </span>
          <h4 className="font-sans font-bold">Message</h4>
          <p>{message}</p>
        </a>
      </Link>
    </li>
  );
}
