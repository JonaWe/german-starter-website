import Image from 'next/image';
import Link from 'next/link';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';

export default function NavUserMenu() {
  const t = useLocalization();

  const [user, loading] = useAuthState(auth);

  return !user ? (
    <div className="grid grid-cols-2 divide-x-2 font-bebas">
      <Link href="/">
        <a className="px-2 text-2xl transition-colors hover:text-sand-500">
          {t.signIn.title}
        </a>
      </Link>
      <Link href="/">
        <a className="px-2 text-2xl transition-colors hover:text-sand-500">
          {t.signIn.signUp}
        </a>
      </Link>
    </div>
  ) : (
    <div className="felx">
      {user.photoURL && (
        <Link href="#">
          <a>
            <img src={user.photoURL} alt="avatar" className="w-12 shadow-md" />
          </a>
        </Link>
      )}
    </div>
  );
}
