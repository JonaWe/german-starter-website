import Link from 'next/link';
import { useRouter } from 'next/router';

import { Ring } from '@uiball/loaders';

import { getAdminLayout } from '../../../../components/Layout/AdminLayout';
import ArrowButton from '../../../../components/UI/ArrowButton';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import LoadingScreen from '../../../../components/UI/LoadingScreen';
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

  console.log(user);

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
      ManageUser: {uid}
    </div>
  );
};

ManageUser.getLayout = getAdminLayout;

export default ManageUser;
