import Link from 'next/link';

import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const AdminNews: NextPageWithLayout = () => {
  const t = useLocalization();
  return (
    <>
      <Link href="/admin/news/add">
        <a>Add news</a>
      </Link>
    </>
  );
};

AdminNews.getLayout = getAdminLayout;

export default AdminNews;
