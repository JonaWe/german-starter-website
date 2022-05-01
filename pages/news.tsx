import { useRouter } from 'next/router';

import { Timestamp } from '@firebase/firestore';
import StickyBox from 'react-sticky-box';

import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import NewsItem from '../components/News/NewsItem';
import NewsNav from '../components/News/NewsNav';
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
  announced: boolean;
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
      <div className="w-full max-w-screen-2xl sm:w-5/6 flex items-start gap-10">
        {/* FIXME: Fix offsetTop not working */}
        <StickyBox offsetTop={0} offsetBottom={0}>
          <NewsNav newsItems={newsItems} />
        </StickyBox>
        <div className="w-full">
          {newsItems &&
            newsItems.map(({ en, de, releaseDate, authors, id }, index) => {
              const { title, content } = locale === 'de' ? de : en;
              const { seconds, nanoseconds } = JSON.parse(releaseDate);
              return (
                <NewsItem
                  title={title}
                  id={id}
                  content={content}
                  authors={authors}
                  className="mb-44"
                  releaseDate={new Timestamp(seconds, nanoseconds)}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

News.getLayout = getDefaultLayout('/assets/images/news_banner.jpg');

export async function getStaticProps() {
  return {
    props: {
      newsItems: (await getPublicNewsArticle()).map((item) => {
        item.announced = item.announced ? item.announced : false;
        return { ...item, releaseDate: JSON.stringify(item.releaseDate) };
      }),
    },
  };
}

export default News;
