import { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { IdTokenResult } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import AdminNav from '../Admin/AdminNav';
import LoadingScreen from '../UI/LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: LayoutProps) {
  const [user, loading] = useAuthState(auth);
  const [tokenResult, setTokenResult] = useState<IdTokenResult>();

  const router = useRouter();

  useEffect(() => {
    console.log(loading, user, tokenResult);
    if (loading) {
    } else if (!loading && !user) {
      router.push('/signin?successUrl=admin');
    } else if (user && !tokenResult) {
      user.getIdTokenResult().then((value) => setTokenResult(value));
    } else if (tokenResult) {
      if (!tokenResult.claims.admin) {
        router.push('/signin?successUrl=admin');
      }
    }
  }, [user, loading, router, tokenResult]);

  if (!tokenResult?.claims.admin) return <LoadingScreen />;

  return (
    <div className="flex">
      <AdminNav />
      <div className="mt-40">{children}</div>
    </div>
  );
}

export function getAdminLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
}
