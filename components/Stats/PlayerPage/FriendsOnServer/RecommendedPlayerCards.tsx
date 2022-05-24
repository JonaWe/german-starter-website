import { players } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';
import { fetchPlayersStats } from '../../../../lib/stats/fetch/fetchPlayersStats';
import RecommendedPlayerCard from './RecommendedPlayerCard';

const fetchTopPlayers = async (rand: any) => {
  return await fetchPlayersStats(rand, 10, null, [
    {
      desc: true,
      id: 'kills',
    },
  ]);
};

const EXIT_DELAY = 0.1;

export default function RecommendedPlayerCards({
  steamid,
  publicProfile = false,
  cardCount = 4,
}: {
  steamid: string;
  publicProfile?: boolean;
  cardCount?: number;
}) {
  const {
    data: friendsOnServer,
    error: friendsError,
    isLoading: friendsLoading,
  } = useFriendsOnServer(steamid, {
    refetchOnWindowFocus: false,
  });

  const randomIndex = Math.floor(Math.random() * (10 + 1));

  const { data: topPlayers } = useQuery(
    ['topPlayers', randomIndex],
    (randomIndex) => fetchTopPlayers(randomIndex),
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
      <ul className="h-52 flex gap-6">
        <AnimatePresence>
          {cardItems?.slice(0, cardCount).map((item, i) => (
            <motion.li
              key={i}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 0.2,
                delay: (cardCount - (i + 1)) * EXIT_DELAY,
              }}
            >
              <RecommendedPlayerCard
                key={item.steamid}
                name={item.name}
                steamid={item.steamid}
                tags={
                  item.tags
                    ? item.tags
                    : [{ name: item.relationship, color: 'green' }]
                }
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </SkeletonTheme>
  );
}
