import { getDefaultLayout } from '../../components/Layout/DefaultLayout';
import PlayerStatsTable from '../../components/Stats/PlayerStatsTable';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import { NextPageWithLayout } from '../_app';

const StatsPage: NextPageWithLayout = () => {
  useSetHeading('stats');
  return (
    <section className="justify-center flex">
      <div className="w-full max-w-screen-2xl sm:w-5/6 flex items-start sm:gap-10 p-3 sm:p-0">
        <PlayerStatsTable />
      </div>
    </section>
  );
};

StatsPage.getLayout = getDefaultLayout('/assets/images/rules_banner.jpg');

export default StatsPage;
