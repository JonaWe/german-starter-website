import { getAdminLayout } from '../../components/Layout/AdminLayout';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminUsers: NextPageWithLayout = () => {
  const t = useLocalization();
  return <>users</>;
};

AdminUsers.getLayout = getAdminLayout;

export default AdminUsers;