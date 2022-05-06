import axios from 'axios';
import { HiFire } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import useLocalization from '../../../../hooks/useLocalization';
import useSteamUser from '../../../../hooks/useSteamUser';
import Avatar from '../../../UI/Avatar';
import Tooltip from '../../../UI/Tooltip';

interface CellProps {
  value: string;
  row: any;
}

const PLAYER_OF_THE_DAY = 'PLAYER_OF_THE_DAY';

const fetchPLayerOfTheDay = async () => {
  const { data } = await axios.post('/api/stats/player-of-the-day');
  return data.playerOfTheDay;
};

export default function PlayerCell({ value: name, row }: CellProps) {
  const id = row.original.steamid;
  const [player] = useSteamUser(id);
  const { data } = useQuery(PLAYER_OF_THE_DAY, fetchPLayerOfTheDay);
  const t = useLocalization();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 w-fit">
        <Avatar url={player?.avatar.medium} className="w-10 h-10" />
        <div className="flex flex-col justify-center">
          <p className="font-medium leading-none">{id ? name : <Skeleton />}</p>
          <p className="text-xs text-sand-500/40">{id || <Skeleton />}</p>
        </div>
      </div>
      {id && id === data?.player && (
        <Tooltip text={t.stats.playerOfTheDay}>
          <HiFire className="text-2xl fill-rust-500 hover:animate-pulse hover:scale-105 transition-all" />
        </Tooltip>
      )}
    </div>
  );
}
