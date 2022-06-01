import axios from 'axios';
import { useQuery } from 'react-query';

const PLAYER_STATS = 'PLAYER_STATS';

const fetchStats = async (steamid: string) => {
  const data = await axios.post('/api/steam/getPlayerRustStats', {
    steamid,
  });
  return data.data;
};

export default function usePlayerRustStats(steamid: string) {
  const query = useQuery([PLAYER_STATS, steamid], () => fetchStats(steamid));
  return query;
}
