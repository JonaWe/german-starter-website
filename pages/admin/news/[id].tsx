import { useRouter } from 'next/router';

import { collection, doc } from '@firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { NewsItemWithId } from '.';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import MarkdownEditor from '../../../components/MarkdownEditor';
import Spinner from '../../../components/UI/Spinner';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';
import { NewsItem } from '../../news';

const EditNews: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Edit News Item');

  const router = useRouter();
  const { id } = router.query;

  const newsRef = collection(db, 'news');
  const newsItem = doc(newsRef, id as string);

  const [data, loading, error] = useDocumentData(newsItem);
  const news = data as NewsItem;
  const newsItemWithId: NewsItemWithId = { ...news, __id: id as string };

  if (loading && !error) {
    return <Spinner />;
  } else if (news) {
    return <MarkdownEditor newsItem={newsItemWithId} />;
  } else {
    router.push('/admin/news');
    return null;
  }
};

EditNews.getLayout = getAdminLayout;

export default EditNews;
