import { useEffect, useState } from 'react';

import ActivityCalendar from 'react-activity-calendar';

import useStatsPerDay from '../../../../hooks/useStatsPerDay';

export default function ActivityChart({
  steamid,
  year,
}: {
  steamid: string;
  year: number;
}) {
  const raw = useStatsPerDay(steamid);

  const [data, setData] = useState<any[]>([]);

  const firstDay = new Date(year, 0, 1);

  const lastDay = new Date(year, 11, 31);

  const convertData = (raw: any[]) => {
    const max = Math.max(...raw.map((o) => o.kills));
    const reduction = 2;

    const data = raw.map((entry) => {
      const level = Math.ceil((entry.kills / (max / reduction)) * 4);
      console.log(max);

      return {
        count: entry.kills,
        date: new Date(entry.kill_time).toISOString().split('T')[0],
        level: entry.kills === 1 ? 1 : level <= 4 ? level : 4,
      };
    });

    //Set last and first day to zero so chart show full year even if no data exists
    if (data.at(-1)?.date !== lastDay.toISOString().split('T')[0])
      data.push({
        count: 0,
        level: 0,
        date: lastDay.toISOString().split('T')[0],
      });

    if (data.at(0)?.date !== firstDay.toISOString().split('T')[0])
      data.push({
        count: 0,
        level: 0,
        date: firstDay.toISOString().split('T')[0],
      });
    return data;
  };
  useEffect(() => {
    if (raw)
      setData(
        convertData(raw).filter((v) => new Date(v.date).getFullYear() === year)
      );
  }, [raw, year]);

  return (
    <div className="w-full">
      <ActivityCalendar
        labels={{
          totalCount: '{{count}} kills in {{year}}',
          tooltip: '<strong>{{count}} kills</strong> on {{date}}',
        }}
        style={{ width: '100%' }}
        color={'#CD412B'}
        weekStart={1}
        theme={{
          level0: '#373737',
          level1: '#732c20',
          level2: '#7b271a',
          level3: '#a43422',
          level4: '#cd412b',
        }}
        data={data}
      ></ActivityCalendar>
    </div>
  );
}
