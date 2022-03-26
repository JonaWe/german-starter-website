import { getAdminLayout } from '../../components/Layout/AdminLayout';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminHome: NextPageWithLayout = () => {
  const t = useLocalization();
  return <>Secret message for admins</>;
};

AdminHome.getLayout = getAdminLayout;

export default AdminHome;
