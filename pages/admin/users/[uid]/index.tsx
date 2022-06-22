import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Ring } from '@uiball/loaders';
import { format } from 'date-fns';
import { HiCheckCircle } from 'react-icons/hi';

import ProfileInfoItem from '../../../../components/Admin/ManageUsers/UserPage/ProfileInfoItem';
import ResolvedTickets from '../../../../components/Admin/ManageUsers/UserPage/ResolvedTickets';
import { getAdminLayout } from '../../../../components/Layout/AdminLayout';
import ArrowButton from '../../../../components/UI/ArrowButton';
import Avatar from '../../../../components/UI/Avatar';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import Button from '../../../../components/UI/Button';
import SimpleListbox from '../../../../components/UI/Listbox';
import LoadingScreen from '../../../../components/UI/LoadingScreen';
import { useSetHeading } from '../../../../context/defaultLayoutHeadingContext';
import { ACCESS_ROLES, RoleId } from '../../../../data/AccessRoles';
import useUser from '../../../../hooks/admin/useUser';
import useRole from '../../../../hooks/useRole';
import changeRole from '../../../../lib/changeRole';
import { NextPageWithLayout } from '../../../_app';

const roleOptions = [
  {
    id: ACCESS_ROLES.dev.id,
    name: ACCESS_ROLES.dev.name,
  },
  {
    id: ACCESS_ROLES.owner.id,
    name: ACCESS_ROLES.owner.name,
  },
  {
    id: ACCESS_ROLES.admin.id,
    name: ACCESS_ROLES.admin.name,
  },
  {
    id: ACCESS_ROLES.user.id,
    name: ACCESS_ROLES.user.name,
  },
];

const ManageUser: NextPageWithLayout = () => {
  useSetHeading('User');
  const router = useRouter();
  const {
    query: { uid },
  } = router;

  const [selectedRole, setSelectedRole] = useState<{
    id: string;
    name: string;
  } | null>(roleOptions[0]);

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
            <h3 className="font-sans font-semibold items-center gap-3">Role</h3>
            <div className="flex items-center gap-3">
              <div className="w-52">
                <SimpleListbox
                  options={roleOptions}
                  selected={selectedRole || roleOptions[0]}
                  setSelected={(role) => setSelectedRole(role)}
                />
              </div>
              <Button
                text="Save"
                onClick={() => {
                  if (user && selectedRole)
                    changeRole(user.uid, selectedRole.id as RoleId);
                }}
              >
                <HiCheckCircle className="text-xl" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-sans font-semibold mb-4">Resolved Tickets</h3>
            <ResolvedTickets />
          </div>
        </div>
      </section>
    </div>
  );
};

ManageUser.getLayout = getAdminLayout;

export default ManageUser;
