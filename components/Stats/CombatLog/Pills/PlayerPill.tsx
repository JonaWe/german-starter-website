import { motion } from 'framer-motion';

import useSteamUser from '../../../../hooks/useSteamUser';

export default function PlayerPill({ text }: { text: string }) {
  const [player] = useSteamUser(text);
  return (
    <motion.span
      layout="position"
      className={`px-2 py-0.5 rounded-full border transition-all ${
        !player
          ? 'text-background-150 border-background-150 bg-background-400/5  max-w-0 w-0'
          : 'text-purple-500 bg-purple-500/5 border-purple-500 w-fit max-w-lg'
      }`}
    >
      {player?.nickname || text}
    </motion.span>
  );
}
