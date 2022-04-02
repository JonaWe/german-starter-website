import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import MarkdownEditor from '../../../components/MarkdownEditor';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const AddNews: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Add News Item');
  return (
    <>
      <MarkdownEditor />
    </>
  );
};

AddNews.getLayout = getAdminLayout;

export default AddNews;
