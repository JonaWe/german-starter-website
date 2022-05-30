import Link from 'next/link';

import { HiFire } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import useLocalization from '../../../../hooks/useLocalization';
import usePlayerOfTheDay from '../../../../hooks/usePlayerOfTheDay';
import useSteamUser from '../../../../hooks/useSteamUser';
import { CommunityVisibilityState } from '../../../../lib/steam/interfaces/CommunityVisibilityState';
import { PersonaState } from '../../../../lib/steam/interfaces/PersonaState';
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

  const personaState = player?.personaState;
  const visibilityState = player?.visibilityState;

  return (
    <div className="flex items-center justify-between">
      <Link href={`/profile/${id}`}>
        <a className="flex gap-2 w-fit min-w-full">
          <span className="relative">
            <Avatar
              url={player?.avatar.medium}
              className="w-10 h-10 flex-none"
            />
            <span
              className={`absolute h-2 w-2 ${
                visibilityState === CommunityVisibilityState.Public
                  ? personaState === PersonaState.Online
                    ? 'bg-green-500'
                    : personaState === PersonaState.Offline
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                  : 'bg-gray-500'
              } rounded-full -right-1 -bottom-1 z-10`}
            />
          </span>
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
          <Link href={"#spotlight"}>
            <HiFire className="text-2xl fill-rust-500 hover:animate-pulse hover:scale-105 transition-all cursor-pointer" />
          </Link>
        </Tooltip>
      )}
    </div>
  );
}
