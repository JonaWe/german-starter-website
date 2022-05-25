import { collection, doc } from 'firebase/firestore';
import {
  useDocumentData,
  useDocumentDataOnce,
} from 'react-firebase-hooks/firestore';
import { HiFire } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { db } from '../../../firebase/clientApp';
import usePlayerOfTheDay from '../../../hooks/usePlayerOfTheDay';
import usePlayerStats from '../../../hooks/usePlayerStats';
import useStatsPerDay from '../../../hooks/useStatsPerDay';
import useSteamUser from '../../../hooks/useSteamUser';
import GeneralInfo from './GeneralInfo';
import GeneralInfoItem from './GeneralInfoItem';
import QuickInfo from './QuickInfo';

const sampleData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Spotlight() {
  const playerOfTheDay = usePlayerOfTheDay();

  const steamid = playerOfTheDay?.player;

  const [player] = useSteamUser(steamid);
  const stats = usePlayerStats(steamid);
  const data = useStatsPerDay(steamid);

  console.log(data);

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
      value: 34,
      Icon: <HiFire className="text-2xl -mb-1" />,
      name: 'Level',
    },
  ];

  return (
    <div className="mb-14 relative">
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
        <div className="w-full h-96 grid grid-cols-2">
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
                <Tooltip />
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
    </div>
  );
}
