import axios from 'axios';
import { useQuery } from 'react-query';

const PLAYER_RUST_INFO = 'PLAYER_RUST_INFO';

const fetchStats = async (steamid: string) => {
  const data = await axios.post('/api/steam/getPlayerRustInfo', {
    steamid,
  });
  return data.data;
};

export default function usePlayerRustInfo(steamid: string) {
  const query = useQuery([PLAYER_RUST_INFO, steamid], () =>
    fetchStats(steamid)
  );
  return query;
}
