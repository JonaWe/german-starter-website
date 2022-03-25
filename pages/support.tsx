import { NextPage } from 'next';

import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';

const Support: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <PageHeader imageURL="/assets/images/support_banner.jpg">
        <h1>{t.supportPage.title}</h1>
      </PageHeader>
      <PageContent>Support</PageContent>
    </>
  );
};

export default Support;
