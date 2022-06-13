import axios from 'axios';
import { useQuery } from 'react-query';

const ID = 'MAP';

const fetchMap = async () => {
  const { data } = await axios.get('/api/server/map');
  return data;
};

export default function useServerMap() {
  const query = useQuery(ID, fetchMap, {
    refetchOnWindowFocus: false,
  });

  return query;
}
