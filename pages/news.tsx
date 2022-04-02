import { useRouter } from 'next/router';

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
  releaseDate: string;
  authors: string[];
  published: boolean;
  id: string;
}

interface NewsPageProps {
  newsItems: NewsItem[];
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
          return (
            <NewsItem
              title={title}
              content={content}
              releaseDate={JSON.parse(releaseDate)}
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
      newsItems: await getPublicNewsArticle(),
    },
  };
}

export default News;
