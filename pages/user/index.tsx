import { useAuthState } from 'react-firebase-hooks/auth';

import { getUserLayout } from '../../components/Layout/UserLayout';
import Tabs from '../../components/UI/Tabs';
import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const tabs = [
  { title: 'Profile', body: <div>your profile</div> },
  { title: 'Reports', body: <div>a list of my reports</div> },
  { title: 'Settings', body: <div>settings</div> },
];

const UserHome: NextPageWithLayout = () => {
  const t = useLocalization();

  const [user] = useAuthState(auth);

  return (
    <div className="pt-40 h-screen">
      <div className="max-w-screen-lg w-screen overflow-hidden h-full sm:m-10 m-1 p-3">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 aspect-square overflow-hidden">
            <img src={user?.photoURL || ''} alt="" className="object-fit scale-100 hover:scale-105 transition-all opacity-100 hover:opacity-75 cursor-pointer" />
          </div>
          <div>
            <p className="leading-none">{user?.displayName}</p>
            <p className="text-xs text-sand-500/70">{user?.email}</p>
          </div>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

UserHome.getLayout = getUserLayout;

export default UserHome;
