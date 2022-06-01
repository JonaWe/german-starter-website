import {
  HiClock,
  HiCursorClick,
  HiEye,
  HiFire,
  HiPuzzle,
} from 'react-icons/hi';
import { ImHammer2 } from 'react-icons/im';
import Skeleton from 'react-loading-skeleton';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import useLocalization from '../../../hooks/useLocalization';
import usePlayerBanInfo from '../../../hooks/usePlayerBanInfo';
import usePlayerRustInfo from '../../../hooks/usePlayerRustInfo';
import usePlayerStats from '../../../hooks/usePlayerStats';
import useStatsPerDay from '../../../hooks/useStatsPerDay';
import useSteamUser from '../../../hooks/useSteamUser';
import { CommunityVisibilityState } from '../../../lib/steam/interfaces/CommunityVisibilityState';
import { PersonaState } from '../../../lib/steam/interfaces/PersonaState';
import ChartTooltip from '../../UI/Charts/Tooltip';
import DeathsKillsChartTooltip from '../Charts/PlayerDeathsKillsChart/DeathsKillsChartTooltip';
import GeneralInfo from './GeneralInfo';
import QuickInfo from './QuickInfo';

export default function Spotlight({ playerOfTheDay }: any) {
  const steamid = playerOfTheDay?.player;

  const [player] = useSteamUser(steamid);
  const stats = usePlayerStats(steamid);
  const data = useStatsPerDay(steamid);
  const { data: banInfo } = usePlayerBanInfo(steamid);
  const { data: rustInfo } = usePlayerRustInfo(steamid);
  const t = useLocalization();

  const quickInfoItems = [
    {
      value: playerOfTheDay?.kills,
      name: 'Kills in 24h',
    },
    {
      value: stats?.pvpdeaths,
      name: 'PvP Deaths',
    },
    {
      value: stats?.kills,
      name: 'Total kills',
    },
    {
      value: stats?.nemesis.nem_name,
      name: 'Nemesis',
    },
  ];

  const generalInfo = [
    {
      value:
        player?.visibilityState === CommunityVisibilityState.Public
          ? 'Public'
          : 'Private',
      Icon: (
        <HiEye className="text-2xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Profile status',
    },
    {
      value:
        banInfo?.gameBans > 0
          ? `Game banned, ${banInfo.daysSinceLastBan} days ago!`
          : 'Private',
      Icon: (
        <ImHammer2 className="text-2xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Ban status',
    },
    {
      value: new Date(player?.created * 1000).toLocaleDateString(),
      Icon: (
        <HiCursorClick className="text-2xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: t.stats.steamInfo.created,
    },
    {
      value: Math.floor((rustInfo?.playTime / 60) * 10) / 10 + ' h',
      Icon: (
        <HiPuzzle className="text-2xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: t.stats.steamInfo.playTimeRust,
    },
    {
      value:
        player?.personaState === PersonaState.Online ? 'online' : 'offline',
      Icon: (
        <HiClock className="text-2xl fill-sand-500/60 group-hover:fill-sand-500 transition-all" />
      ),
      name: 'Status',
    },
  ];

  return (
    <article className="mb-14 relative scroll-m-32" id="spotlight">
      <div className="w-full h-full absolute opacity-20 blur-lg">
        <img
          src={'/assets/overlays/gray_overlay.svg'}
          className="w-full h-full object-cover absolute z-[1]"
        />
        <img
          src={player?.avatar?.large}
          className="w-full h-full object-cover relative"
        />
      </div>
      <header className="relative z-10">
        <div className="flex items-center gap-3">
          <h2 className="text-5xl leading-[0]">
            {player?.nickname || <Skeleton />}
          </h2>
          <HiFire className="text-4xl mb-1 fill-rust-500" />
        </div>
        <p className="opacity-75">Spotlight</p>
      </header>
      <div className="relative z-10">
        <div className="w-full h-96 grid grid-cols-2 pt-4">
          <GeneralInfo items={generalInfo} />
          <div className="flex justify-between flex-col">
            <ResponsiveContainer width={'100%'} height={'75%'}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CD412B" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#CD412B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis dataKey="kills" />
                <Tooltip
                  isAnimationActive={false}
                  content={({ payload, active }) => (
                    <ChartTooltip active={active}>
                      <DeathsKillsChartTooltip payload={payload} />
                    </ChartTooltip>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="kills"
                  stroke="#CD412B"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="deaths"
                  fillOpacity={0}
                  stroke="#373737"
                />
              </AreaChart>
            </ResponsiveContainer>
            <QuickInfo items={quickInfoItems} />
          </div>
        </div>
      </div>
    </article>
  );
}
