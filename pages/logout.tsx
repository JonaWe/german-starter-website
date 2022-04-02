import { useEffect } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase/clientApp';

const Logout: NextPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      signOut(auth)
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          router.push('/');
        });
    }
  }, [user, router]);

  return null;
};

export default Logout;
