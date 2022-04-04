import axios from 'axios';
import { useQuery } from 'react-query';

export default function usePublicUser(uid: string) {
  const fetchPlayer = async (uid: string) => {
    const data = await axios.post('/api/users/getPublicProfiles/byId', {
      uid,
    });
    return data;
  };

  const { data, isLoading } = useQuery(
    ['user', uid],
    () => fetchPlayer(uid),
    {
      retry: false,
    }
  );

  return [data?.data, isLoading];
}
