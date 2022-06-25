import { getDefaultLayout } from '../../components/Layout/DefaultLayout';
import ReportTypes from '../../components/ReportPlayer';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import useLocalization from '../../hooks/useLocalization';
import { NextPageWithLayout } from '../_app';

const Support: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading(t.supportPage.title);
  return (
    <section>
      <ReportTypes />
    </section>
  );
};

Support.getLayout = getDefaultLayout('/assets/images/support_banner.jpg');

export default Support;
