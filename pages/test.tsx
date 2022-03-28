import { useEffect } from 'react';

import type { NextPage } from 'next';

import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import { auth } from '../firebase/clientApp';

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    user.getIdTokenResult().then((res) => console.log(res));

    //   user.getIdToken().then((token) => {
    //     axios
    //       .post(
    //         `/api/admin/promoteToAdmin`,
    //         {uid: "99PhxR0hoqQRvZQclvs9tKVCUZg1"},
    //         {
    //           headers: { Authorization: `Bearer ${token}` },
    //         }
    //       )
    //       .then((response) => {
    //         console.log(response);
    //       });
    //   });
  }, [user]);

  const logout = () =>
    signOut(auth)
      .then(() => {
        console.log('signd out');
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <>
      <PageHeader imageURL="/assets/images/support_banner.jpg">
        <h1>{user?.email}</h1>
      </PageHeader>
      <PageContent>
        <button onClick={logout}>logout</button>
      </PageContent>
    </>
  );
};

export default Home;
