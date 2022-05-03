import Skeleton from 'react-loading-skeleton';

import useSteamUser from '../../../../hooks/useSteamUser';
import Avatar from '../../../UI/Avatar';

interface CellProps {
  value: string;
  row: any;
}

export default function PlayerCell({ value: name, row }: CellProps) {
  const id = row.original.steamid;
  const [player] = useSteamUser(id);
  return (
    <div className="flex gap-2 w-fit">
      <Avatar url={player?.avatar.medium} className="w-10 h-10" />
      <div className="flex flex-col justify-center">
        <p className="font-medium leading-none">{id ? name : <Skeleton />}</p>
        <p className="text-xs text-sand-500/40">{id || <Skeleton />}</p>
      </div>
    </div>
  );
}
