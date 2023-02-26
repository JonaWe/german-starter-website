import axios from 'axios';
import { useQuery } from 'react-query';

export default function useOneToOneStats(killerId: number, targetId: number) {
  const fetchPlayer = async (killerId: number, targetId: number) => {
    const data = await axios.post('/api/stats/player/player-on-player', {
      killerId,
      targetId,
    });
    return data.data;
  };

  return useQuery(
    ['oneToOne', killerId + targetId],
    () => fetchPlayer(killerId, targetId),
    {
      retry: false,
    }
  );
}
