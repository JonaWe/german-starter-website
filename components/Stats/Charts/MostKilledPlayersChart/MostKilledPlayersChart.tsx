import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import useMostKilledPlayers from '../../../../hooks/useMostKilledPlayers';
import ChartTooltip from '../../../UI/Charts/Tooltip/ChartTooltip';
import DeathsKillsChartTooltip from '../PlayerDeathsKillsChart/DeathsKillsChartTooltip';

export default function MostKilledPLayersChart({
  steamid,
}: {
  steamid: string;
}) {
  const { data } = useMostKilledPlayers(steamid);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          cursor={{
            fill: '#373737',
          }}
          content={({ payload, active }) => (
            <ChartTooltip active={active}>
              <div className="p-2">
                <p className="leading-none">
                  {payload ? payload[0]?.payload.name : 0}
                </p>
                <p className="text-xs opacity-50">Name</p>
              </div>
            </ChartTooltip>
          )}
        />
        <Bar dataKey="kills" fill="#CD412B" />
      </BarChart>
    </ResponsiveContainer>
  );
}
