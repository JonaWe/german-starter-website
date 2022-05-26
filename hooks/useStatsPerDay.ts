import axios from 'axios';
import { useQuery } from 'react-query';

const KILLS_PER_DAY = 'KILLS_PER_DAY';

const fetchStats = async (steamid: string) => {
  const { data } = await axios.get(
    `/api/stats/player/statsPerDay?steamid=${steamid}`
  );

  return data.killsPerDay;
};

export default function useStatsPerDay(steamid: string) {
  const { data } = useQuery([KILLS_PER_DAY, steamid], () => fetchStats(steamid));
  return data;
}
