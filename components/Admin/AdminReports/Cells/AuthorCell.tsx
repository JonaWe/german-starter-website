import usePublicUser from '../../../../hooks/usePublicUser';
import Avatar from '../../../UI/Avatar';

interface AuthorCellProps {
  value: string;
}

export default function AuthorCell({ value: uid }: AuthorCellProps) {
  const [author] = usePublicUser(uid);

  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-12 h-12" url={author?.photoURL} />
      <div className="flex flex-col">
        <p className="leading-none font-bold">{author?.displayName || '-'}</p>
        <p className="text-xs text-sand-500/60">
          {author?.email || 'no email'}
        </p>
      </div>
    </div>
  );
}
