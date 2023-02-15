import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { formatDistanceStrict } from 'date-fns';
import {
  GiBearHead,
  GiChewedSkull,
  GiFist,
  GiPistolGun,
  GiRun,
  GiSuicide,
} from 'react-icons/gi';
import {
  HiChevronLeft,
  HiClock,
  HiCursorClick,
  HiEye,
  HiInformationCircle,
  HiPuzzle,
} from 'react-icons/hi';
import { ImHammer2 } from 'react-icons/im';

import CopyButton from '../../../components/Buttons/CopyButton';
import { getDefaultLayout } from '../../../components/Layout/DefaultLayout';
import CommentSection from '../../../components/News/CommentSection';
import PageContent from '../../../components/PageContent';
import KillsByDayOfWeekChart from '../../../components/Stats/Charts/KillsByDayOfWeekChart';
import MostKilledPLayersChart from '../../../components/Stats/Charts/MostKilledPlayersChart/MostKilledPlayersChart';
import PlayerDeathsKillsChart from '../../../components/Stats/Charts/PlayerDeathsKillsChart';
import RecommendedPlayerCards from '../../../components/Stats/PlayerPage/FriendsOnServer/RecommendedPlayerCards';
import PersonalNotes from '../../../components/Stats/PlayerPage/Notes';
import PlayerPageSEO from '../../../components/Stats/PlayerPage/PlayerPageSEO';
import PvEChart from '../../../components/Stats/PlayerPage/PvEChart';
import Avatar from '../../../components/UI/Avatar';
import Tooltip from '../../../components/UI/Tooltip';
import useAvgTimeAlive from '../../../hooks/useAvgTimeAlive';
import useLocalization from '../../../hooks/useLocalization';
import usePlayerBanInfo from '../../../hooks/usePlayerBanInfo';
import usePlayerRustInfo from '../../../hooks/usePlayerRustInfo';
import usePlayerStats from '../../../hooks/usePlayerStats';
import useSteamUser from '../../../hooks/useSteamUser';
import { prisma } from '../../../lib/stats/db';
import { CommunityVisibilityState } from '../../../lib/steam/interfaces/CommunityVisibilityState';
import { PersonaState } from '../../../lib/steam/interfaces/PersonaState';
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

  const { data: banInfo } = usePlayerBanInfo(String(id));
  const { data: rustInfo } = usePlayerRustInfo(String(id));
  const [player] = useSteamUser(String(id));
  const { data: timeAlive } = useAvgTimeAlive(String(id));
  const nemesis = usePlayerStats(String(id))?.nemesis;

  const t = useLocalization();

  const generalInfo = [
    {
      value:
        player?.visibilityState === CommunityVisibilityState.Public
          ? 'Public'
          : 'Private',
      Icon: (
        <HiEye className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Profile status',
    },
    {
      value:
        banInfo?.gameBans > 0
          ? `Game banned, ${banInfo.daysSinceLastBan} days ago!`
          : 'No game bans',
      Icon: (
        <ImHammer2 className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Ban status',
    },
    ...(player?.created
      ? [
          {
            value: new Date(player?.created * 1000).toLocaleDateString(),
            Icon: (
              <HiCursorClick className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
            ),
            name: t.stats.steamInfo.created,
          },
        ]
      : []),
    ...(rustInfo?.playTime > 0
      ? [
          {
            value: Math.floor((rustInfo?.playTime / 60) * 10) / 10 + ' h',
            Icon: (
              <HiPuzzle className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
            ),
            name: t.stats.steamInfo.playTimeRust,
          },
        ]
      : []),
    {
      value:
        player?.personaState === PersonaState.Online ? 'online' : 'offline',
      Icon: (
        <HiClock className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Status',
    },
  ];

  const statsOnServer = [
    {
      value: stats.kills,
      Icon: (
        <GiPistolGun className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Kills',
    },
    {
      value: stats.pvpdeaths,
      Icon: (
        <GiChewedSkull className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Deaths',
    },
    {
      value: stats.pvedeaths,
      Icon: (
        <GiBearHead className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'PvE Deaths',
    },
    {
      value: stats.suicides,
      Icon: (
        <GiSuicide className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Suicides',
    },
    {
      value: nemesis?.nem_name,
      Icon: (
        <GiFist className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Nemesis',
      onClick: () => router.push('/profile/' + nemesis.nem_id),
    },
    ...(timeAlive?.avgTimeBetween
      ? [
          {
            value: formatDistanceStrict(
              (timeAlive?.avgTimeBetween || 0) * 1000,
              new Date(0)
            ),
            Icon: (
              <GiRun className="text-xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
            ),
            name: 'Avg time alive',
          },
        ]
      : []),
  ];

  return (
    <PageContent>
      <PlayerPageSEO player={steam} locale={router.locale || 'de'} />
      <Link href={'/stats#players'}>
        <a className="mt-10 mb-3 flex gap-1 items-center opacity-50 hover:opacity-70 transition-opacity">
          <HiChevronLeft className="text-xl" />
          <span>View all</span>
        </a>
      </Link>
      <div className="flex gap-5 items-center">
        <Avatar className="w-24 h-24" url={steam.avatar.large} />
        <div>
          <h1 className="text-8xl -mb-3">{steam.nickname}</h1>
          <CopyButton className="font-mono opacity-75" text={String(id)} />
        </div>
      </div>
      {/* <AliasTable aliases={aliases} /> */}
      {/* <PvEChart data={pve_events} /> */}
      {/* <CombatLog steamid={stats.steamid} /> */}
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <div className="grid md:grid-cols-3 grid-cols-1 md:grid-rows-2 gap-y-5 gap-x-10 mt-5">
        <div className="row-start-1 row-end-4">
          <div className="flex justify-between items-center">
            <h2>Steam Info</h2>
            <a
              href={'http://steamcommunity.com/profiles/' + stats.steamid}
              className="opacity-30 text-sm hover:underline"
              target={'_blank'}
              rel="noreferrer"
            >
              Open steam profile
            </a>
          </div>
          <div className="grid grid-cols-2 grid-flow-row gap-3 mb-3">
            {generalInfo.map((info) => (
              <div
                key={info.name}
                className="flex justify-between flex-col bg-background-150/75 hover:bg-background-150 p-3 rounded-md"
              >
                <div className="flex">{info.Icon}</div>
                <div className="mt-2">
                  <div className="text-lg -mb-1">{info.value}</div>
                  <div className="text-opacity-30 text-sm">{info.name}</div>
                </div>
              </div>
            ))}
          </div>
          <h2>Stats on server</h2>
          <div className="grid grid-cols-2 grid-flow-row gap-3 mb-3">
            {statsOnServer.map((info) => (
              <div
                key={info.name}
                className={`flex justify-between flex-col bg-background-150/75 hover:bg-background-150 p-3 rounded-md ${
                  info?.onClick ? 'cursor-pointer' : ''
                }`}
                onClick={info?.onClick}
              >
                <div className="flex">{info.Icon}</div>
                <div className="mt-2">
                  <div className="text-lg -mb-1">{info.value}</div>
                  <div className="text-opacity-30 text-sm">{info.name}</div>
                </div>
              </div>
            ))}
          </div>
          <h2>
            Personal notes{' '}
            <Tooltip text="You can create notes about players that are completely private and only visible to you.">
              <HiInformationCircle className="inline text-lg ml-2 opacity-20" />
            </Tooltip>
          </h2>
          <PersonalNotes id={String(id)} />
        </div>
        <div className="col-span-2">
          <h2>Kills and Deaths over time</h2>
          <div className="h-72">
            <PlayerDeathsKillsChart height="100%" steamid={stats.steamid} />
          </div>
        </div>
        <div className="col-span-2">
          <h2>Most killed players</h2>
          <div className="h-72">
            <MostKilledPLayersChart steamid={stats.steamid} />
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-2 mt-5">
          <div className="col-span-2 sm:col-span-1">
            <h2>Activity by day of week</h2>
            <div className="h-72">
              <KillsByDayOfWeekChart steamid={stats.steamid} />
            </div>
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
