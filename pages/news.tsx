import { NextPage } from 'next';
import { useRouter } from 'next/router';

import NewsItem from '../components/News/NewsItem';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';

interface NewsItemContent {
  title: string;
  content: string;
}
interface NewsItem {
  de: NewsItemContent;
  en: NewsItemContent;
  releaseDate: string;
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
      newsItems: [
        {
          de: {
            title: 'Wartungsarbeiten',
            content: `# Wartungsarbeiten am 28.03.2022\nAm Montag Morgen den **28.03.2022** um **06:05 Uhr** gibt es Wartungsarbeiten. Dies wird ca 5 bis 10 minuten in Anspruch nehmen.`,
          },
          en: {
            title: 'Maintenance',
            content: `# Maintenance on 28.03.2022\nThere will be some maintenance on Monday **28.03.2022** at **06:05 CET** this will take about 5 to 10 minutes.`,
          },
          releaseDate: JSON.stringify(new Date()),
        },
      ],
    },
  };
}

export default News;
