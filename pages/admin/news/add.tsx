import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import MarkdownEditor from '../../../components/MarkdownEditor';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const AddNews: NextPageWithLayout = () => {
  const t = useLocalization();
  return (
    <>
      <MarkdownEditor />
    </>
  );
};

AddNews.getLayout = getAdminLayout;

export default AddNews;
