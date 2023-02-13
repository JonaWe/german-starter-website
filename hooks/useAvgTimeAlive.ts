import axios from 'axios';
import { useQuery } from 'react-query';

import { PlayerStats } from '../pages/api/stats/player';

const AVG_TIME_ALIVE = 'AVG_TIME_ALIVE';

const fetchStats = async (steamid: string) => {
  const { data } = await axios.get(
    `/api/stats/player/avg-time-between-deaths?steamid=${steamid}`
  );
  return data;
};

export default function useAvgTimeAlive(steamid: string) {
  return useQuery([AVG_TIME_ALIVE, steamid], () => fetchStats(steamid));
}
