import { useRouter } from 'next/router';

import ManageAdmins from '../../../components/Admin/ManageUsers';
import UsersTable from '../../../components/Admin/ManageUsers/UsersTable';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const AdminUsers: NextPageWithLayout = () => {
  const t = useLocalization();
  const { locale } = useRouter();

  useSetHeading('Users');
  return (
    <section>
      <div className="flex gap-10">
        <div>
          <h2>User account{"'"}s</h2>
          <UsersTable />
        </div>
        <ManageAdmins />
      </div>
    </section>
  );
};

AdminUsers.getLayout = getAdminLayout;

export default AdminUsers;
