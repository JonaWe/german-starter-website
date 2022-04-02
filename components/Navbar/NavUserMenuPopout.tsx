import Link from 'next/link';

import { User } from 'firebase/auth';

import useAdmin from '../../hooks/useAdmin';

export default function NavUserMenuPopout({ user }: { user: User }) {
  const [admin] = useAdmin(user);

  return (
    <div className="bg-background-800/95 py-4 px-6 mt-2 flex flex-col gap-2">
      <Link href="/user">
        <a>Profile</a>
      </Link>
      {admin && (
        <Link href="/admin" passHref>
          <a target="_blank" rel="noopener noreferrer">
            Admin
          </a>
        </Link>
      )}
    </div>
  );
}
