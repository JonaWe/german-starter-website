import { useAuthState } from 'react-firebase-hooks/auth';

import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import { getUserLayout } from '../components/Layout/UserLayout';
import PageContent from '../components/PageContent';
import Voting from '../components/Voting';
import { auth } from '../firebase/clientApp';
import useLocalization from '../hooks/useLocalization';
import { NextPageWithLayout } from './_app';

const UserHome: NextPageWithLayout = () => {
  const t = useLocalization();

  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <section className="flex h-screen items-center justify-center">
        <Voting />
      </section>
    </PageContent>
  );
};

UserHome.getLayout = getDefaultLayout();

export default UserHome;
