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
import FavoriteButton from '../../Favorites/FavoriteButton';

interface CellProps {
  value: string;
  row: any;
}

export default function BookmarkCell({ value: name, row }: CellProps) {
  const id = row.original.steamid;

  console.log(row.original.steamid);

  return (
    <div className="flex items-center justify-between group-hover:opacity-100 opacity-0 transition-all">
      {id && <FavoriteButton steamid={id} iconOnly />}
    </div>
  );
}
