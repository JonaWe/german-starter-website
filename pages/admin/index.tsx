import { getAdminLayout } from '../../components/Layout/AdminLayout';
import Button from '../../components/UI/Button';
import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import announceNews from '../../lib/discord/announceNews';
import type { NextPageWithLayout } from '../_app';

const AdminHome: NextPageWithLayout = () => {
  const t = useLocalization();
  return (
    <>
      <Button text="announceNews" onClick={() => announceNews(auth)} />
    </>
  );
};

AdminHome.getLayout = getAdminLayout;

export default AdminHome;
