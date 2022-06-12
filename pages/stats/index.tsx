import { GetServerSideProps } from 'next';

import axios from 'axios';

import { getDefaultLayout } from '../../components/Layout/DefaultLayout';
import PageContent from '../../components/PageContent';
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
    <>
      <Spotlight playerOfTheDay={playerOfTheDay} />
      <PlayerStatsTable />
    </>
  );
};

StatsPage.getLayout = getDefaultLayout('/assets/images/pvp_raid_05.jpg');

export default StatsPage;
