import { NextPage } from 'next';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader';
import useLocalization from '../hooks/useLocalization';

const Rules: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <PageHeader imageURL="/assets/images/rules_banner.jpg">
        <h1>404</h1>
      </PageHeader>
      <PageContent>Page not found</PageContent>
    </>
  );
};

export default Rules;
