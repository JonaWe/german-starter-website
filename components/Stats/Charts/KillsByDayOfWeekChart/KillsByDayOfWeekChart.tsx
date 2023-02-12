import {
    Brush,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import useStatsPerDay from '../../../../hooks/useStatsPerDay';

interface Result {
  name: string;
  kills: number;
  deaths: number;
}

export default function KillsByDayOfWeekChart({
  steamid,
}: {
  steamid: string;
}) {
  const data = useStatsPerDay(steamid);
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Thursday',
    'Wednesday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const result: Result[] = daysOfWeek
    .reduce((acc: Result[], dayOfWeek) => {
      acc.push({ name: dayOfWeek, kills: 0, deaths: 0 });
      return acc;
    }, [])
    .map((dayData: Result) => {
      data?.forEach((item: any) => {
        const date = new Date(item.kill_time);
        if (dayData.name === daysOfWeek[date.getUTCDay()]) {
          dayData.kills += item.kills;
          dayData.deaths += item.deaths;
        }
      });
      return dayData;
    })
    .sort(
      (a: Result, b: Result) =>
        daysOfWeek.indexOf(a.name) - daysOfWeek.indexOf(b.name)
    );

  console.log(result);

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result}>
          <PolarGrid opacity={0.3} />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#fffbf6' }} />
          <PolarRadiusAxis angle={30} />
          <Radar
            name="Kills"
            dataKey="kills"
            stroke="#CD412B"
            fill="#CD412B"
            fillOpacity={0.6}
          />
          <Radar
            name="Deaths"
            dataKey="deaths"
            stroke="#373737"
            fill="#373737"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
