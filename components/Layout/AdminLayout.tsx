import { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { IdTokenResult } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { DefaultLayoutHeadingContextProvider } from '../../context/defaultLayoutHeadingContext';
import { ACCESS_ROLES, RoleId } from '../../data/AccessRoles';
import { auth } from '../../firebase/clientApp';
import isAllowedRole from '../../lib/firebase/isAllowedRole';
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

  const REQUIRED_ROLE_ID: RoleId = 'admin';

  useEffect(() => {
    if (loading) {
    } else if (!loading && !user) {
      router.push('/signin?successUrl=admin');
    } else if (user && !tokenResult) {
      user.getIdTokenResult().then((value) => setTokenResult(value));
    } else if (tokenResult) {
      if (!isAllowedRole(tokenResult.claims.role as RoleId, REQUIRED_ROLE_ID)) {
        router.push('/signin?successUrl=admin');
      }
    }
  }, [user, loading, router, tokenResult]);

  if (!isAllowedRole(tokenResult?.claims.role as RoleId, REQUIRED_ROLE_ID))
    return <LoadingScreen />;

  return (
    <DefaultLayoutHeadingContextProvider value={{ setHeading }}>
      <div className="flex h-screen overflow-hidden">
        <AdminNav />
        <div className="pt-12 px-8 w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-background-400">
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
