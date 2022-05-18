import axios from 'axios';
import { useQuery } from 'react-query';

import { PlayerStats } from '../pages/api/stats/player';

const PLAYER_STATS = 'PLAYER_STATS';

const fetchStats = async (steamid: string) => {
  const { data } = await axios.get(`/api/stats/player?steamid=${steamid}`);
  return data.player;
};

export default function usePlayerStats(steamid: string) {
  const { data } = useQuery([PLAYER_STATS, steamid], () => fetchStats(steamid));
  return data as PlayerStats;
}
