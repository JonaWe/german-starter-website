import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { PrismaClient } from '@prisma/client';
import { Pie, PieChart, Tooltip } from 'recharts';

import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import useLocalization from '../../../hooks/useLocalization';
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
  console.log(props);
  const t = useLocalization();
  const router = useRouter();

  const { id } = router.query;
  const { pve_events } = props;

  return (
    <div className="m-32">
      Playerstats
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <PieChart width={730} height={250}>
        <Pie data={pve_events} dataKey={'_count.steamid'} fill={'#cd412b'} />
        <Tooltip
          separator={': '}
        />
      </PieChart>
      <CommentSection path={`users/${id}/comments`} />
    </div>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
