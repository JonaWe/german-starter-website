import Link from 'next/link';

import { motion } from 'framer-motion';

import useSteamUser from '../../../../hooks/useSteamUser';
import Avatar from '../../../UI/Avatar';
import { CellProps } from '../LogItem';

export default function PlayerCell({
  value: steamid,
  restricted,
}: CellProps) {
  const [player] = useSteamUser(steamid);

  const restrictedText = 'Player';

  return (
    <Link href={restricted ? '#' : `/profile/${steamid}/${player?.nickname}`}>
      <motion.a
        layout="position"
        className={`px-2 rounded-full transition-all text-sm cursor-pointer font-bold inline-flex items-center gap-1 flex-row`}
      >
        <Avatar
          url={player?.avatar.small}
          className="w-6 rounded-full inline-block"
        />
        {restricted && !player ? restrictedText : player?.nickname || steamid}
      </motion.a>
    </Link>
  );
}
