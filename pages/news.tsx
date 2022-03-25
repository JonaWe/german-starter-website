import { NextPage } from 'next';
import { useRouter } from 'next/router';

import NewsItem from '../components/News/NewsItem';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';
import getPublicNewsArticle from '../lib/firebase/getPublicNewsArticle';

export interface NewsItemContent {
  title: string;
  content: string;
}
export interface NewsItem {
  de: NewsItemContent;
  en: NewsItemContent;
  releaseDate: string;
  authors: string[];
  published?: boolean;
}

interface NewsPageProps {
  newsItems: NewsItem[];
}

const News: NextPage<NewsPageProps> = ({ newsItems }: NewsPageProps) => {
  const t = useLocalization();
  const { locale } = useRouter();
  return (
    <>
      <PageHeader imageURL="/assets/images/news_banner.jpg">
        <h1>{t.newsPage.title}</h1>
      </PageHeader>
      <PageContent>
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
      </PageContent>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      newsItems: await getPublicNewsArticle(),
    },
  };
}

export default News;
