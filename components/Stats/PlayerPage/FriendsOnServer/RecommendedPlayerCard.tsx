import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import useLocalization from '../../../../hooks/useLocalization';
import useSteamUser from '../../../../hooks/useSteamUser';
import { Friend } from '../../../../pages/api/steam/getPlayerFriendsOnServer';
import ArrowButton from '../../../UI/ArrowButton';
import Avatar from '../../../UI/Avatar';
import Pill from '../../../UI/Pill';
import RecommendedPlayerTags from './RecommendedPlayerTags';

interface RecommendedPlayerCardProps {
  name: string;
  steamid: string;
  key: string;
  tags: Tag[];
}

export interface Tag {
  name: string;
  color: Color;
}

export type Color = 'green' | 'yellow' | 'sand' | 'blue' | 'rust';

export default function RecommendedPlayerCard({
  name,
  steamid,
  key,
  tags: defaultTags,
}: RecommendedPlayerCardProps) {
  const [player] = useSteamUser(steamid);
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const router = useRouter();

  useEffect(() => {
    if (!player || player.visibilityState !== 3) return;
    setTags([
      ...defaultTags,
      {
        name: 'Public',
        color: 'blue',
      },
    ]);
  }, [player]);

  const t = useLocalization();

  return (
    <button
      className="relative w-72 h-full bg-background-700 overflow-hidden py-5 px-7 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition group text-left font-sans"
      aria-disabled={!player}
      onClick={() => router.push(player ? `/profile/${steamid}/${name}` : '#')}
      key={`card_${key}`}
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
                <p className="text-sm min-w-[70%]">{steamid || <Skeleton />}</p>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-sans font-bold mb-1">Tags</h3>
              {player && <RecommendedPlayerTags tags={tags} />}
            </div>
          </div>
          {player && <ArrowButton text={t.stats.viewProfile} />}
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
    </button>
  );
}
