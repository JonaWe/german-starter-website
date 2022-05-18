import Link from 'next/link';

import axios from 'axios';
import { HiFire } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import useLocalization from '../../../../hooks/useLocalization';
import usePlayerOfTheDay from '../../../../hooks/usePlayerOfTheDay';
import useSteamUser from '../../../../hooks/useSteamUser';
import Avatar from '../../../UI/Avatar';
import Tooltip from '../../../UI/Tooltip';

interface CellProps {
  value: string;
  row: any;
}

export default function PlayerCell({ value: name, row }: CellProps) {
  const id = row.original.steamid;
  const [player] = useSteamUser(id);
  const data = usePlayerOfTheDay();
  const t = useLocalization();

  return (
    <div className="flex items-center justify-between">
      <Link href={`/profile/${id}`}>
        <a className="flex gap-2 w-fit min-w-full">
          <Avatar url={player?.avatar.medium} className="w-10 h-10 flex-none" />
          <div className="flex flex-col justify-center min-w-[30%]">
            <p className="font-medium leading-none">
              {id ? name : <Skeleton />}
            </p>
            <p className="text-xs text-sand-500/40">{id || <Skeleton />}</p>
          </div>
        </a>
      </Link>
      {id && id === data?.player && (
        <Tooltip text={t.stats.playerOfTheDay}>
          <HiFire className="text-2xl fill-rust-500 hover:animate-pulse hover:scale-105 transition-all" />
        </Tooltip>
      )}
    </div>
  );
}
