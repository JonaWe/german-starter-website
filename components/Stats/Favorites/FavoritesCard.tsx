import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';

import usePlayerStats from '../../../hooks/usePlayerStats';
import useSteamUser from '../../../hooks/useSteamUser';
import Avatar from '../../UI/Avatar';
import FavoriteButton from './FavoriteButton';

export default function FavoritesCard({ steamid }: { steamid: string }) {
  const [player] = useSteamUser(steamid);
  const stats = usePlayerStats(steamid);

  console.log(stats);

  return (
    <li className="p-5 flex justify-between flex-col bg-background-150/75 rounded-md">
      <div className="flex justify-between gap-4">
        <Link href={'/profile/' + steamid}>
          <a className="flex gap-3">
            <Avatar
              url={player?.avatar.medium}
              className="h-12 w-12 flex-none"
            />
            <div className="overflow-hidden w-full">
              <h2 className="leading-none truncate">
                {player?.nickname || <Skeleton />}
              </h2>
              <p className="text-sm min-w-[70%]">{steamid || <Skeleton />}</p>
            </div>
          </a>
        </Link>
        <div>
          <FavoriteButton iconOnly={true} steamid={steamid} />
        </div>
      </div>
    </li>
  );
}
