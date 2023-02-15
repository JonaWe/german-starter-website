import axios from 'axios';
import { useQuery } from 'react-query';

const KILLS_PER_DAY = 'MOST_KILLED_PLAYERS';

const fetchStats = async (steamid: string) => {
  const { data } = await axios.get(
    `/api/stats/player/most-killed-players?steamid=${steamid}`
  );

  return data;
};

export default function useMostKilledPlayers(steamid: string) {
  const q = useQuery([KILLS_PER_DAY, steamid], () => fetchStats(steamid));
  return q;
}
