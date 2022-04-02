import { getAdminLayout } from '../../components/Layout/AdminLayout';
import useLocalization from '../../hooks/useLocalization';
import type { NextPageWithLayout } from '../_app';

const AdminReports: NextPageWithLayout = () => {
  const t = useLocalization();
  return <>reports</>;
};

AdminReports.getLayout = getAdminLayout;

export default AdminReports;
