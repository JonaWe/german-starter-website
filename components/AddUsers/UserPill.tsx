import { HiX } from 'react-icons/hi';

import usePublicUser from '../../hooks/usePublicUser';

interface AuthorProps {
  id: string;
  onClick?: (uid: string) => void;
}

export default function UserPill({ id, onClick }: AuthorProps) {
  const [author] = usePublicUser(id);

  return (
    <span className="text-xs px-2.5 py-1.5 bg-sand-500/20 rounded-full border border-sand-500 text-sand-500 uppercase mr-2 flex gap-3 w-fit">
      {author?.displayName || author?.email}
      {onClick && (
        <button type="button" onClick={() => onClick(id)}>
          <HiX />
        </button>
      )}
    </span>
  );
}
