import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';
import { Item } from 'framer-motion/types/components/Reorder/Item';

import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import NewsItem from '../components/News/NewsItem';
import { useSetHeading } from '../context/defaultLayoutHeadingContext';
import useLocalization from '../hooks/useLocalization';
import getPublicNewsArticle from '../lib/firebase/getPublicNewsArticle';
import { NextPageWithLayout } from './_app';

export interface NewsItemContent {
  title: string;
  content: string;
}
export interface NewsItem {
  de: NewsItemContent;
  en: NewsItemContent;
  releaseDate: Timestamp;
  authors: string[];
  published: boolean;
  id: string;
}

export interface NewsItemSerialisiert {
  de: NewsItemContent;
  en: NewsItemContent;
  releaseDate: string;
  authors: string[];
  published: boolean;
  id: string;
}
interface NewsPageProps {
  newsItems: NewsItemSerialisiert[];
}

const News: NextPageWithLayout<NewsPageProps> = ({
  newsItems,
}: NewsPageProps) => {
  const t = useLocalization();
  const { locale } = useRouter();
  useSetHeading(t.newsPage.title);
  return (
    <section className="flex justify-center">
      {(!newsItems || newsItems.length === 0) && <p>No News found!</p>}
      {newsItems &&
        newsItems.map(({ en, de, releaseDate }, index) => {
          const { title, content } = locale === 'de' ? de : en;
          const { seconds, nanoseconds } = JSON.parse(releaseDate);
          return (
            <NewsItem
              title={title}
              content={content}
              releaseDate={new Timestamp(seconds, nanoseconds)}
              key={index}
            />
          );
        })}
    </section>
  );
};

News.getLayout = getDefaultLayout('/assets/images/news_banner.jpg');

export async function getStaticProps() {
  return {
    props: {
      newsItems: (await getPublicNewsArticle()).map((item) => {
        return { ...item, releaseDate: JSON.stringify(item.releaseDate) };
      }),
    },
  };
}

export default News;
