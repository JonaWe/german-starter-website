import { useEffect, useState } from 'react';

import { players } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollContainer } from 'react-indiana-drag-scroll';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';
import { fetchPlayersStats } from '../../../../lib/stats/fetch/fetchPlayersStats';
import RecommendedPlayerCard from './RecommendedPlayerCard';

const DELAY_FACTOR = 0.1;

export default function RecommendedPlayerCards({
  steamid,
  publicProfile = false,
  cardCount = 4,
}: {
  steamid: string;
  publicProfile?: boolean;
  cardCount?: number;
}) {
  const scrollContainer = useScrollContainer();
  const fetchTopPlayers = async () => {
    return await fetchPlayersStats(
      0,
      cardCount + 1,
      null,
      [
        {
          desc: true,
          id: 'kills',
        },
      ],
      undefined,
      true
    );
  };

  const {
    data: friendsOnServer,
    error: friendsError,
    isLoading: friendsLoading,
  } = useFriendsOnServer(steamid, {
    refetchOnWindowFocus: false,
  });

  const { data: topPlayers } = useQuery(
    ['topPlayers'],
    () => fetchTopPlayers(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const topPlayersWithTag = (topPlayers?.data as players[])
    ?.filter(
      //Remove current player form list
      ({ steamid: topPlayerSteamid }) => String(topPlayerSteamid) !== steamid
    )
    ?.map((topPlayer) => {
      //Reformat data to match RecommendedPlayerCard
      return {
        steamid: topPlayer.steamid,
        name: topPlayer.name,
        tags: [
          {
            name: 'Top Player',
            color: 'yellow',
          },
        ],
      };
    });

  const cardItems = publicProfile
    ? friendsOnServer
      ? friendsOnServer
      : friendsLoading
      ? Array(4).fill({})
      : topPlayersWithTag
    : topPlayersWithTag;

  return (
    <SkeletonTheme baseColor="#161616" highlightColor="#1b1b1b">
      <motion.ul
        className="h-56 flex gap-6 w-full overflow-x-auto scrollbar-thin hover:scrollbar-thumb-background-600 transition-all snap-x md:snap-none pb-4"
        ref={scrollContainer.ref}
      >
        <AnimatePresence>
          {cardItems?.slice(0, cardCount).map((item, i) => {
            const delay = (cardCount - (i + 1)) * DELAY_FACTOR;
            return (
              <motion.li
                key={i}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.2,
                  delay,
                }}
                className="snap-start"
              >
                <RecommendedPlayerCard
                  key={item.steamid}
                  name={item.name}
                  steamid={item.steamid}
                  animationDelay={i * DELAY_FACTOR}
                  tags={
                    item.tags
                      ? item.tags
                      : [{ name: item.relationship, color: 'green' }]
                  }
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </SkeletonTheme>
  );
}
