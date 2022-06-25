import { useRouter } from 'next/router';

import ManageAdmins from '../../../components/Admin/ManageUsers';
import UsersTable from '../../../components/Admin/ManageUsers/UsersTable';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const segments = [
  {
    name: 'Admin',
    path: '/admin',
  },
  {
    name: 'Users',
    path: 'users',
  },
];

const AdminUsers: NextPageWithLayout = () => {
  const t = useLocalization();
  const { locale } = useRouter();

  useSetHeading('Users');
  return (
    <section>
      <div className="">
        <div>
          <Breadcrumb segments={segments} />
          <UsersTable />
        </div>
      </div>
    </section>
  );
};

AdminUsers.getLayout = getAdminLayout;

export default AdminUsers;
