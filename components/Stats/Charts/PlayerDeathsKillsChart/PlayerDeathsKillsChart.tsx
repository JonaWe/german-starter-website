import {
  Area,
  AreaChart,
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
  );
}
