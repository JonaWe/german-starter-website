import axios from 'axios';
import { useQuery } from 'react-query';

export default function useSteamUser(steamid: string) {

  const fetchPlayer = async () => {
    const data = await axios.post('/api/steam/getPlayerSummary', {
      steamid,
    });
    return data;
  };

  const { data } = useQuery('steamUser', fetchPlayer, {
    retry: false,
  });

  return data?.data.summary;
}
