import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import useLocalization from '../../../../hooks/useLocalization';
import useSteamUser from '../../../../hooks/useSteamUser';
import { Friend } from '../../../../pages/api/steam/getPlayerFriendsOnServer';
import Avatar from '../../../UI/Avatar';

export default function FriendCard({ name, steamid, relationship }: Friend) {
  const [player] = useSteamUser(steamid);
  const t = useLocalization();

  return (
    <AnimatePresence>
      <Link
        href={player ? `/profile/${steamid}/${name}` : '#'}
        key={`card_${steamid}`}
      >
        <a
          className="relative w-72 h-full bg-background-700 overflow-hidden py-5 px-7 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition group"
          aria-disabled={!player}
        >
          <div className="relative z-10 h-full">
            <div className="flex justify-between flex-col h-full">
              <div>
                <div className="flex gap-3">
                  <Avatar
                    url={player?.avatar.medium}
                    className="h-12 w-12 flex-none"
                  />
                  <div className="overflow-hidden w-full">
                    <h2 className="leading-none truncate">
                      {name || <Skeleton />}
                    </h2>
                    <p className="text-sm min-w-[70%]">
                      {steamid || <Skeleton />}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-sans font-bold mb-1">Tags</h3>
                  {player && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`bg-green-500/10 rounded-full border border-green-500/80 text-green-500/80 uppercase text-xs px-2.5 py-1`}
                    >
                      {relationship}
                    </motion.span>
                  )}
                </div>
              </div>
              {player && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'backIn', duration: 1 }}
                  className={`font-sans text-sm flex items-center cursor-pointer group-hover:text-rust-500 transition-all text-rust-500/80 gap-1`}
                >
                  {t.stats.viewProfile}
                  <HiArrowRight className="group-hover:mr-0 group-hover:ml-3 mr-3 transition-all group-hover:fill-rust-500 fill-rust-500/80" />
                </motion.span>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-t from-background-700 to-background-700/90 absolute inset-0 z-[1]" />
          {player && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={player?.avatar.large}
              alt="bg"
              className="absolute inset-0 object-cover w-full z-0 object-center group-hover:scale-[103%] transition-transform"
            />
          )}
        </a>
      </Link>
    </AnimatePresence>
  );
}
