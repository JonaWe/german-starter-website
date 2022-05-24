import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import { Pie, PieChart, Tooltip } from 'recharts';

import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import RecommendedPlayerCards from '../../../components/Stats/PlayerPage/FriendsOnServer/RecommendedPlayerCards';
import PlayerPageSEO from '../../../components/Stats/PlayerPage/PlayerPageSEO';
import useFriendsOnServer from '../../../hooks/useFriendsOnServer';
import useLocalization from '../../../hooks/useLocalization';
import useSteamUser, { fetchPlayer } from '../../../hooks/useSteamUser';
import { prisma } from '../../../lib/stats/db';
import { steam } from '../../../lib/steam/steamClient';
import { NextPageWithLayout } from '../../_app';

const CHART_COLORS = [
  '#f1c5be',
  '#ecafa5',
  '#e7988c',
  '#e18172',
  '#dc6b59',
  '#cd412b',
  '#b43926',
  '#9a3120',
  '#81291b',
  '#682116',
  '#4f1910',
];

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const steamId = BigInt(params?.id as string);

  const playerStats = await prisma.players.findUnique({
    where: {
      steamid: BigInt(steamId),
    },
  });

  const aliases = await prisma.player_alias.findMany({
    where: { steamid: BigInt(steamId) },
  });

  // const pve_events = await prisma.pvelog.findMany({
  //   where: { steamid: BigInt(steamId) },
  // });

  const pve_events = await prisma.pvelog.groupBy({
    by: ['reason'],
    _count: {
      steamid: true,
    },
    where: { steamid: BigInt(steamId) },
  });

  const steamInfo = JSON.parse(
    JSON.stringify(await steam.getUserSummary(String(steamId)))
  );

  return {
    props: {
      steam: steamInfo,
      stats: {
        ...playerStats,
        steamid: String(playerStats?.steamid),
        first_time_seen: playerStats?.first_time_seen?.getTime(),
      },
      aliases: aliases.map((a) => ({
        ...a,
        steamid: String(a.steamid),
        time: a.time.getTime(),
      })),
      pve_events: pve_events.map((e) => ({
        ...e,
      })),
    },
  };
};

const Home: NextPageWithLayout = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const { pve_events, stats, steam } = props;

  const t = useLocalization();

  return (
    <>
      <PlayerPageSEO player={steam} locale={router.locale || 'de'} />
      <div className="m-32">
        Playerstats
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        {/* <PieChart width={730} height={250}>
          <Pie data={pve_events} dataKey={'_count.steamid'} fill={'#cd412b'} />
          <Tooltip separator={': '} />
        </PieChart> */}
        <div className="h-96">placehoder</div>
        <h2 className="mb-3">Related profiles</h2>
        <RecommendedPlayerCards
          steamid={stats.steamid}
          publicProfile={steam ? steam.visibilityState === 3 : false}
        />
        <CommentSection path={`steam_users/${id}/comments`} />
      </div>
    </>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
