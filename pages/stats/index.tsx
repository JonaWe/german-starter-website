import { getDefaultLayout } from '../../components/Layout/DefaultLayout';
import PlayerStatsTable from '../../components/Stats/PlayerStatsTable';
import Spotlight from '../../components/Stats/Spotlight';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import { NextPageWithLayout } from '../_app';

const StatsPage: NextPageWithLayout = () => {
  useSetHeading('stats');
  return (
    <section className="justify-center flex">
      <div className="w-full max-w-screen-2xl sm:w-5/6 sm:gap-10 p-3 sm:p-0">
        <Spotlight />
        <PlayerStatsTable />
      </div>
    </section>
  );
};

StatsPage.getLayout = getDefaultLayout('/assets/images/rules_banner.jpg');

export default StatsPage;
