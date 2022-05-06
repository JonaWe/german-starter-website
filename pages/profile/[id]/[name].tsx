import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { PrismaClient } from '@prisma/client';

import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import useLocalization from '../../../hooks/useLocalization';
import { NextPageWithLayout } from '../../_app';

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

  const pve_events = await prisma.pvelog.findMany({
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
        steamid: String(e.steamid),
        time: e.time.getTime(),
      })),
    },
  };
};

const Home: NextPageWithLayout = (props: any) => {
  console.log(props);
  const t = useLocalization();
  const router = useRouter();

  const { id } = router.query;

  return (
    <div className="mt-32">
      Playerstats
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <CommentSection path={`users/${id}/comments`} />
    </div>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
