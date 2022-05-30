import { GetServerSideProps } from 'next';

import axios from 'axios';

import { getDefaultLayout } from '../../components/Layout/DefaultLayout';
import PlayerStatsTable from '../../components/Stats/PlayerStatsTable';
import Spotlight from '../../components/Stats/Spotlight';
import { useSetHeading } from '../../context/defaultLayoutHeadingContext';
import { BASE_DOMAIN } from '../../lib/constants';
import { NextPageWithLayout } from '../_app';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.post(
    `${BASE_DOMAIN}/api/stats/player-of-the-day`
  );

  return {
    props: { playerOfTheDay: data.playerOfTheDay },
  };
};

const StatsPage: NextPageWithLayout = (props: any) => {
  const { playerOfTheDay } = props;

  useSetHeading('stats');
  return (
    <section className="justify-center flex">
      <div className="w-full max-w-screen-2xl sm:w-5/6 sm:gap-10 p-3 sm:p-0">
        <Spotlight playerOfTheDay={playerOfTheDay} />
        <PlayerStatsTable />
      </div>
    </section>
  );
};

StatsPage.getLayout = getDefaultLayout('/assets/images/rules_banner.jpg');

export default StatsPage;
