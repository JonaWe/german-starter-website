import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { PlayerStats } from '../pages/api/stats/player';
import { Friend } from '../pages/api/steam/getPlayerFriendsOnServer';

const FRIENDS_ON_SERVER = 'FRIENDS_ON_SERVER';

const fetchFriends = async (steamid: string) => {
  const { data } = await axios.post(`/api/steam/getPlayerFriendsOnServer`, {
    steamid,
  });
  return data.friendsOnServer;
};

export default function useFriendsOnServer(
  steamid: string,
  options?: UseQueryOptions<Friend[]>
) {
  const query = useQuery<Friend[]>(
    [FRIENDS_ON_SERVER, steamid],
    () => fetchFriends(steamid),
    options
  );
  return { ...query, data: query.data };
}

export { fetchFriends };
