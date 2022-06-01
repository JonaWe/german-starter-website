import axios from 'axios';
import { useQuery } from 'react-query';

const BAN_INFO = 'BAN_INFO';

const fetchInfo = async (steamid: string) => {
  const { data } = await axios.post(`/api/steam/getPlayerBanInfo`, {
    steamid,
  });

  return data;
};

export default function usePlayerBanInfo(steamid: string) {
  const query = useQuery([BAN_INFO, steamid], () => fetchInfo(steamid));
  return query;
}
