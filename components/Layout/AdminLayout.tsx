import { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { IdTokenResult } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
      <SkeletonTheme baseColor="#373737" highlightColor="#555">
        <div className="flex h-screen overflow-hidden">
          <AdminNav />
          <div className="pt-12 px-8 w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-background-400">
            <h1 className="text-6xl mb-4">{heading}</h1>
            {children}
          </div>
        </div>
      </SkeletonTheme>
    </DefaultLayoutHeadingContextProvider>
  );
}

export function getAdminLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
}
