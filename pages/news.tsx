import { NextPage } from 'next';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';

const News: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <PageHeader imageURL="/assets/images/news_banner.jpg">
        <h1>{t.newsPage.title}</h1>
      </PageHeader>
      <PageContent>News</PageContent>
    </>
  );
};

export default News;
