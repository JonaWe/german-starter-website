import { useRouter } from 'next/router';

import { collection } from '@firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import NewsTable from '../../../components/Admin/AdminNews/NewsTable';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Button from '../../../components/UI/Button';
import Spinner from '../../../components/UI/Spinner';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import getDataWithId from '../../../lib/firebase/getDataWithId';
import type { NextPageWithLayout } from '../../_app';
import { NewsItem } from '../../news';

export interface NewsItemWithId extends NewsItem {
  __id: string;
}

const AdminNews: NextPageWithLayout = () => {
  const { locale } = useRouter();
  useSetHeading('News Items');
  const t = useLocalization();

  const newsRef = collection(db, 'news');
  const [data] = useCollection(newsRef);

  const articles = getDataWithId(data) as NewsItemWithId[];

  return (
    <>
      {articles && (
        <NewsTable articles={articles} local={locale === 'en' ? 'en' : 'de'} />
      )}
      {!articles && <Spinner />}
      <Button
        href="/admin/news/add"
        text="Add News"
        primary
        useLink
        className="fixed right-0 bottom-0 mb-10 mr-20"
      />
    </>
  );
};

AdminNews.getLayout = getAdminLayout;

export default AdminNews;
