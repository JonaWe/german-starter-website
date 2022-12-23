import { Orbit, Ring } from '@uiball/loaders';
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

  const { data, error, isLoading } = useQuery('serverInfo', fetchPlayerCount, {
    retry: 2,
  });

  return (
    <span
      className={`flex items-center h-full gap-1 ${className}`}
      title={title}
    >
      <p className="font-bebas text-sand-600">
        {isLoading && <span className="opacity-20 animate-pulse">0</span>}
        {!error && data?.data.playerCount}
      </p>
      {!error ? (
        <span className="flex h-2 w-2 relative">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLoading ? "bg-gray-400 animate-pulse" : "bg-green-600"} opacity-75`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? "bg-gray-400 animate-pulse" : "bg-green-600"}`}
          />
        </span>
      ) : (
        <span className="text-xs rounded-md px-2 py-1 bg-red-700">OFFLINE</span>
      )}
    </span>
  );
}
