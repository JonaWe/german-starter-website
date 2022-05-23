import { players } from '@prisma/client';
import { useQuery } from 'react-query';

import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';
import { fetchPlayersStats } from '../../../../lib/stats/fetch/fetchPlayersStats';
import RecommendedPlayerCard from './RecommendedPlayerCard';

export default function RecommendedPlayerCards({
  steamid,
  publicProfile = false,
  cardCount,
}: {
  steamid: string;
  publicProfile?: boolean;
  cardCount?: number;
}) {
  const {
    data: friendsOnServer,
    error: friendsError,
    isLoading: friendsLoading,
  } = useFriendsOnServer(steamid);

  const randomIndex = Math.floor(Math.random() * (10 + 1));

  const { data: topPlayers } = useQuery(
    'topPlayers',
    () =>
      fetchPlayersStats(
        randomIndex,
        10,
        null,
        [
          {
            desc: true,
            id: 'kills',
          },
        ]
      ),
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
    <div className="h-52 flex gap-6">
      {cardItems.slice(0, cardCount || 4).map((item) => (
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
      ))}
    </div>
  );
}
