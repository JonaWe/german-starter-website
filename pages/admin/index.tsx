import { getAdminLayout } from '../../components/Layout/AdminLayout';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminHome: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Dashboard');
  return (
    <>
      <p>Dashboi</p>
    </>
  );
};

AdminHome.getLayout = getAdminLayout;

export default AdminHome;
