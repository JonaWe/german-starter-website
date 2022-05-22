import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchPlayer = async (steamid: string) => {
  const data = await axios.post('/api/steam/getPlayerSummary', {
    steamid,
  });
  return data;
};

export default function useSteamUser(steamid: string) {
  const { data, isLoading } = useQuery(
    ['steamUser', steamid],
    () => fetchPlayer(steamid),
    {
      retry: false,
    }
  );

  return [data?.data.summary ? data.data.summary : null, isLoading];
}
