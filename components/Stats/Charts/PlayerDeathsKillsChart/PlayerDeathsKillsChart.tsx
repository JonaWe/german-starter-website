import { format } from 'date-fns';
import {
  Area,
  AreaChart,
  Brush,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import useStatsPerDay from '../../../../hooks/useStatsPerDay';
import ChartTooltip from '../../../UI/Charts/Tooltip/ChartTooltip';
import DeathsKillsChartTooltip from './DeathsKillsChartTooltip';

export default function PlayerDeathsKillsChart({
  steamid,
  height,
}: {
  steamid: string;
  height?: string;
}) {
  const data = useStatsPerDay(steamid);
  
  return (
    <ResponsiveContainer width={'100%'} height={height || '75%'}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#CD412B" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#CD412B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="kill_time"
          tickFormatter={(d) => `${new Date(d).toLocaleDateString()}`}
          ticks={[data?.at(0)?.kill_time, data?.at(-1)?.kill_time]}
        />
        <YAxis dataKey="kills" width={30} />
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
        <Brush
          dataKey="kill_time"
          tickFormatter={(d) => `${new Date(d).toLocaleDateString()}`}
          height={30}
          stroke="#373737"
          fill="#0000"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
