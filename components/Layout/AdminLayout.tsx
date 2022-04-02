import { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { IdTokenResult } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { DefaultLayoutHeadingContextProvider } from '../../context/defaultLayoutHeadingContext';
import { auth } from '../../firebase/clientApp';
import AdminNav from '../Admin/AdminNav';
import LoadingScreen from '../UI/LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: LayoutProps) {
  const [user, loading] = useAuthState(auth);
  const [tokenResult, setTokenResult] = useState<IdTokenResult>();
  const [heading, setHeading] = useState<string>('Title');

  const router = useRouter();

  useEffect(() => {
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
    <DefaultLayoutHeadingContextProvider value={{ setHeading }}>
      <div className="flex">
        <AdminNav />
        <div className="mt-12 mx-8 w-full">
          <h1 className="text-6xl mb-4">{heading}</h1>
          {children}
        </div>
      </div>
    </DefaultLayoutHeadingContextProvider>
  );
}

export function getAdminLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
}
