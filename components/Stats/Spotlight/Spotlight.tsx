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
import useSteamUser from '../../../hooks/useSteamUser';
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
  const statsRef = collection(db, 'stats');
  const playerOfTheDayRef = doc(statsRef, 'playerOfTheDay');

  const [data] = useDocumentData(playerOfTheDayRef);

  const { player: steamid } = data || {};

  const [player] = useSteamUser(steamid);

  return (
    <div>
      <header>
        <div className="flex items-center gap-3">
          <h2 className="text-5xl leading-[0]">
            {player?.nickname || <Skeleton />}
          </h2>
          <HiFire className="text-4xl mb-1 fill-rust-500" />
        </div>
        <p className="opacity-75">Spotlight</p>
      </header>
      <div>
        <div className="w-full h-96 grid grid-cols-2">
          <div className=""></div>
          <div className="">
            <ResponsiveContainer width={'100%'} height="100%">
              <AreaChart data={sampleData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CD412B" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#CD412B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#CD412B"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* <QuickInfo /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
