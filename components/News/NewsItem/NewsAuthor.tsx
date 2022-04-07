import usePublicUser from '../../../hooks/usePublicUser';
import Avatar from '../../UI/Avatar';

export default function NewsAuthor({ uid }: { uid: string }) {
  const [user] = usePublicUser(uid);

  return (
    <div className="flex gap-3 items-center">
      <Avatar className="w-12 h-12" url={user?.photoURL} />
      <div>
        <p className="leading-none font-bold">{user?.displayName}</p>
        <p className="text-xs text-sand-500/60">{user?.role || 'User'}</p>
      </div>
    </div>
  );
}
