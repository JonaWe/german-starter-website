import { useRouter } from 'next/router';

import { format } from 'date-fns';
import { HiInformationCircle } from 'react-icons/hi';

import ChangeRoleButton from '../../../../components/Admin/ManageUsers/UserPage/ChangeRoleButton';
import ProfileInfoItem from '../../../../components/Admin/ManageUsers/UserPage/ProfileInfoItem';
import ResolvedTickets from '../../../../components/Admin/ManageUsers/UserPage/ResolvedTickets';
import ListTickets from '../../../../components/Admin/ManageUsers/UserPage/ResolvedTickets';
import { getAdminLayout } from '../../../../components/Layout/AdminLayout';
import Avatar from '../../../../components/UI/Avatar';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import InfoBox from '../../../../components/UI/Info';
import LoadingScreen from '../../../../components/UI/LoadingScreen';
import Tooltip from '../../../../components/UI/Tooltip';
import { useSetHeading } from '../../../../context/defaultLayoutHeadingContext';
import useUser from '../../../../hooks/admin/useUser';
import { NextPageWithLayout } from '../../../_app';

const ManageUser: NextPageWithLayout = () => {
  useSetHeading('User');
  const router = useRouter();
  const {
    query: { uid },
  } = router;

  const { error, data: user, isLoading } = useUser(String(uid));

  if (isLoading) return <LoadingScreen />;

  const segments = [
    {
      name: 'Admin',
      path: '/admin',
    },
    {
      name: 'Users',
      path: 'users',
    },
    {
      name: user?.displayName || user?.email || 'User',
      path: '#',
    },
  ];

  return (
    <div>
      <span className="group">
        <Breadcrumb segments={segments} />
      </span>
      <section className="mt-7">
        <div className="flex gap-3 items-center mb-4">
          <Avatar className="w-14 aspect-square" url={user?.photoURL || null} />
          <div>
            <p className="text-lg -mb-1">{user?.displayName}</p>
            <p className="opacity-70 text-xs">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="font-sans font-semibold mb-2">
              Profile information
            </h3>
            <ProfileInfoItem value={user?.email} label={'E-Mail'} />
            <ProfileInfoItem value={user?.displayName} label={'Username'} />
            <ProfileInfoItem
              value={format(
                new Date(user?.metadata.creationTime || ''),
                'MMM dd, yyyy'
              )}
              label={'Profile Created'}
            />
            <ProfileInfoItem
              value={format(
                new Date(user?.metadata.lastSignInTime || ''),
                'MMM dd, yyyy'
              )}
              label={'Last sign in'}
            />
            <ProfileInfoItem
              value={user?.disabled ? 'Disabled' : 'Active'}
              label={'Status'}
            />
            <span className="flex items-center gap-1">
              <h3 className="font-sans font-semibold items-center gap-3">
                Role
              </h3>
              <Tooltip text="Role is applied after a sign out of the user">
                <HiInformationCircle />
              </Tooltip>
            </span>
            {user && <ChangeRoleButton uid={user.uid} />}
          </div>
          <div className='grid grid-cols-2'>
            <div>
              <h3 className="font-sans font-semibold mb-4">Resolved Tickets</h3>
              {user && <ListTickets filter={'resolvedBy'} uid={user.uid} />}
            </div>
            <div>
              <h3 className="font-sans font-semibold mb-4">Opened Tickets</h3>
              {user && <ListTickets filter={'author'} uid={user.uid} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ManageUser.getLayout = getAdminLayout;

export default ManageUser;
