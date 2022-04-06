import axios from 'axios';
import { useQuery } from 'react-query';

export default function useSteamUser(steamid: string) {
  const fetchPlayer = async (steamid: string) => {
    const data = await axios.post('/api/steam/getPlayerSummary', {
      steamid,
    });
    return data;
  };

  const { data, isLoading } = useQuery(
    ['steamUser', steamid],
    () => fetchPlayer(steamid),
    {
      retry: false,
    }
  );

  return [data?.data.summary ? data.data.summary : null, isLoading];
}
