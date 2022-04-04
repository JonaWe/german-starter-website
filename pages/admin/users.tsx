import ManageAdmins from '../../components/Admin/ManageAdmins';
import { getAdminLayout } from '../../components/Layout/AdminLayout';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminUsers: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Users');
  return (
    <section>
      <ManageAdmins />
    </section>
  );
};

AdminUsers.getLayout = getAdminLayout;

export default AdminUsers;
