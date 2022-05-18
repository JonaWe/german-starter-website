import axios from 'axios';
import { useQuery } from 'react-query';

const PLAYER_OF_THE_DAY = 'PLAYER_OF_THE_DAY';

const fetchPLayerOfTheDay = async () => {
  const { data } = await axios.post('/api/stats/player-of-the-day');
  return data.playerOfTheDay;
};

export default function usePlayerOfTheDay() {
  const { data } = useQuery(PLAYER_OF_THE_DAY, fetchPLayerOfTheDay);
  return data;
}
