import AdminNav from '../../components/Admin/AdminNav';
import { getAdminLayout } from '../../components/Layout/AdminLayout';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminHome: NextPageWithLayout = () => {
  const t = useLocalization();
  return (
    <>
      
    </>
  );
};

AdminHome.getLayout = getAdminLayout;

export default AdminHome;
