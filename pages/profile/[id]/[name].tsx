import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import PageContent from '../../../components/PageContent';
import KillsByDayOfWeekChart from '../../../components/Stats/Charts/KillsByDayOfWeekChart';
import PlayerDeathsKillsChart from '../../../components/Stats/Charts/PlayerDeathsKillsChart';
import CombatLog from '../../../components/Stats/CombatLog';
import AliasTable from '../../../components/Stats/PlayerPage/AliasTable';
import RecommendedPlayerCards from '../../../components/Stats/PlayerPage/FriendsOnServer/RecommendedPlayerCards';
import PlayerPageSEO from '../../../components/Stats/PlayerPage/PlayerPageSEO';
import PvEChart from '../../../components/Stats/PlayerPage/PvEChart';
import Avatar from '../../../components/UI/Avatar';
import useLocalization from '../../../hooks/useLocalization';
import { prisma } from '../../../lib/stats/db';
import { CommunityVisibilityState } from '../../../lib/steam/interfaces/CommunityVisibilityState';
import { steam } from '../../../lib/steam/steamClient';
import { NextPageWithLayout } from '../../_app';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let steamId: bigint;

  try {
    steamId = BigInt(params?.id as string);
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  const playerStats = await prisma.players.findUnique({
    where: {
      steamid: BigInt(steamId),
    },
  });

  const aliases = await prisma.player_alias.findMany({
    where: { steamid: BigInt(steamId) },
  });

  const pve_events = await prisma.pvelog.groupBy({
    by: ['reason'],
    _count: {
      steamid: true,
    },
    orderBy: {
      _count: {
        steamid: 'desc',
      },
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
  const { pve_events, stats, steam, aliases } = props;

  const t = useLocalization();

  return (
    <PageContent>
      <PlayerPageSEO player={steam} locale={router.locale || 'de'} />
      <div className="flex gap-5 items-center mt-10">
        <Avatar className="w-24 h-24" url={steam.avatar.large} />
        <h1 className="text-8xl">{steam.nickname}</h1>
      </div>
      {/* <AliasTable aliases={aliases} /> */}
      {/* <PvEChart data={pve_events} /> */}
      {/* <CombatLog steamid={stats.steamid} /> */}
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <div className="grid grid-cols-3 grid-rows-2">
        <div className="row-start-1 row-end-3 bg-black">sidebar</div>
        <div className="col-span-2">
          <h2>Kills and Deaths over time</h2>
          <div className="h-72">
            <PlayerDeathsKillsChart height="100%" steamid={stats.steamid} />
          </div>
        </div>
        <div className="col-span-2 bg-red-500"></div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div className="">
          <h2>Activity by day of week</h2>
          <div className="h-72">
            <KillsByDayOfWeekChart steamid={stats.steamid} />
          </div>
        </div>
      </div>
      <h2 className="mb-3">Related profiles</h2>
      <div className="w-full">
        <RecommendedPlayerCards
          steamid={stats.steamid}
          cardCount={10}
          publicProfile={
            steam
              ? steam.visibilityState === CommunityVisibilityState.Public
              : false
          }
        />
      </div>
      <CommentSection path={`steam_users/${id}/comments`} />
    </PageContent>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
