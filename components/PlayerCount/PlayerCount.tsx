import axios from 'axios';
import { useQuery } from 'react-query';

interface PlayerCountProps {
  serverIp: string;
  className?: string;
  title?: string;
}

export default function PlayerCount({ serverIp, className, title }: PlayerCountProps) {
  const fetchPlayerCount = async () => {
    const data = await axios.post('/api/server/playerCount', {
      ip: serverIp,
    });
    return data;
  };

  const { data } = useQuery('serverInfo', fetchPlayerCount);

  return (
    <span className={`flex items-center gap-1 ${className}`} title={title}>
      <p className="font-bebas text-sand-600">{data?.data.playerCount}</p>
      <div className="bg-green-600 w-2 h-2 animate-pulse rounded-full anima"></div>
    </span>
  );
}
