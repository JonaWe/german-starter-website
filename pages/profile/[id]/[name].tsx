import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PrismaClient } from '@prisma/client';
import { NextSeo } from 'next-seo';
import { Pie, PieChart, Tooltip } from 'recharts';

import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import RecommendedPlayerCards from '../../../components/Stats/PlayerPage/FriendsOnServer/RecommendedPlayerCards';
import useFriendsOnServer from '../../../hooks/useFriendsOnServer';
import useLocalization from '../../../hooks/useLocalization';
import useSteamUser, { fetchPlayer } from '../../../hooks/useSteamUser';
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

  const prisma = new PrismaClient();

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

  return {
    props: {
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
  const { pve_events, stats } = props;

  const [playerInfo] = useSteamUser(stats.steamid);

  const ogParams = {
    name: stats.name,
    steamid: stats.steamid,
    avatar: playerInfo?.avatar.large,
    local: router.locale || 'de',
  };

  const ogBaseUrl = 'https://og.noekrebs.ch/api/rust?';

  const ogUrlParams = new URLSearchParams(ogParams).toString();

  const t = useLocalization();

  return (
    <>
      <NextSeo
        title={`${stats?.name} - German Starter Server`}
        openGraph={{
          url: 'https://www.german-starter.de',
          title: `${stats?.name} - German Starter Server`,
          description: 'German Starter Server',
          site_name: 'German Starter Server',
          images: [
            {
              url: ogBaseUrl + ogUrlParams,
              width: 1200,
              height: 630,
              alt: 'German Starter Banner',
              type: 'image/png',
            },
          ],
        }}
      />
      <div className="m-32">
        Playerstats
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        <PieChart width={730} height={250}>
          <Pie data={pve_events} dataKey={'_count.steamid'} fill={'#cd412b'} />
          <Tooltip separator={': '} />
        </PieChart>
        <h2 className="mb-3">Related profiles</h2>
        <RecommendedPlayerCards steamid={stats.steamid} />
        <CommentSection path={`steam_users/${id}/comments`} />
      </div>
    </>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
