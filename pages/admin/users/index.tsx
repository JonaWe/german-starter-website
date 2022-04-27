import { useRouter } from 'next/router';

import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import ManageAdmins from '../../../components/Admin/ManageUsers';
import UsersTable from '../../../components/Admin/ManageUsers/UsersTable';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import getDataWithId from '../../../lib/firebase/getDataWithId';
import type { NextPageWithLayout } from '../../_app';

const AdminUsers: NextPageWithLayout = () => {
  const t = useLocalization();
  const { locale } = useRouter();

  useSetHeading('Users');
  return (
    <section>
      <ManageAdmins />
      <UsersTable />
    </section>
  );
};

AdminUsers.getLayout = getAdminLayout;

export default AdminUsers;
