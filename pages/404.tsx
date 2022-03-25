import { NextPage } from 'next';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';

const Page: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <PageHeader imageURL="/assets/images/rules_banner.jpg">
        <h1>404</h1>
      </PageHeader>
      <PageContent>{t.pageNotFound}</PageContent>
    </>
  );
};

export default Page;
