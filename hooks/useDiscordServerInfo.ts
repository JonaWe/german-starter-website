import axios from 'axios';
import { useQuery } from 'react-query';

const DISCORD_SERVER_INFO = 'DISCORD_SERVER_INFO';

const fetchInfo = async () => {
  const { data } = await axios.get(`/api/discord`);
  return data;
};

export default function useDiscordServerInfo() {
  const query = useQuery([DISCORD_SERVER_INFO], () => fetchInfo());
  return query;
}
