import usePublicUser from '../../../hooks/usePublicUser';

export default function NewsAuthor({ uid }: { uid: string }) {
  const [user] = usePublicUser(uid);

  return (
    <div className="flex gap-3 items-center">
      <img src={user?.photoURL} className="w-12 aspect-square" alt="" />
      <div>
        <p className="leading-none font-bold">{user?.displayName}</p>
        <p className="text-xs text-sand-500/60">{user?.role || 'User'}</p>
      </div>
    </div>
  );
}
