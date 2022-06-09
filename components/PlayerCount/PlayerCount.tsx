import axios from 'axios';
import { useQuery } from 'react-query';

import Spinner from '../UI/Spinner';

interface PlayerCountProps {
  serverIp: string;
  className?: string;
  title?: string;
}

export default function PlayerCount({
  serverIp,
  className,
  title,
}: PlayerCountProps) {
  const fetchPlayerCount = () => {
    return axios.post('/api/server/playerCount', {
      ip: serverIp,
    });
  };

  const { data, error, isLoading } = useQuery('serverInfo', fetchPlayerCount);

  return (
    <span className={`flex items-center gap-1 ${className}`} title={title}>
      <p className="font-bebas text-sand-600">
        {isLoading && <Spinner />}
        {error ? '?' : data?.data.playerCount}
      </p>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
      </span>
    </span>
  );
}
