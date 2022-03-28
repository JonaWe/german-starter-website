import { useAuthState } from 'react-firebase-hooks/auth';

import { getUserLayout } from '../../components/Layout/UserLayout';
import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const UserHome: NextPageWithLayout = () => {
  const t = useLocalization();

  const [user] = useAuthState(auth);

  return <>{user?.displayName}</>;
};

UserHome.getLayout = getUserLayout;

export default UserHome;
