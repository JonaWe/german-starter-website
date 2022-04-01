import Link from 'next/link';

import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';

export default function NavUserMenu() {
  const t = useLocalization();

  const [user, loading] = useAuthState(auth);

  return !user ? (
    <div
      className={`divide-x-2 font-bebas ${
        loading ? 'opacity-0' : 'opacity-100'
      } transition-opacity`}
    >
      <Link href="/signin">
        <a className="px-2 text-2xl transition-colors hover:text-sand-500">
          {t.signIn.title}
        </a>
      </Link>
      <Link href="/signup">
        <a className="px-2 text-2xl transition-colors hover:text-sand-500">
          {t.signIn.signUp}
        </a>
      </Link>
    </div>
  ) : (
    <>
      {user.photoURL && (
        <Link href="/user">
          <a>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={user.photoURL}
              alt="avatar"
              className="w-12 shadow-md hover:scale-105 scale-100 transition-transform duration-200"
            />
          </a>
        </Link>
      )}
    </>
  );
}
