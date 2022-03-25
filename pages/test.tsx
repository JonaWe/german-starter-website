import type { NextPage } from 'next';
import { auth } from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    user.getIdToken().then((token) => {
      axios
        .get(`/api/admin/promoteToAdmin`, {
          headers: {"Authorization" : `Bearer ${token}`}
        })
        .then((response) => {
          console.log(response);
        });
    });
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
