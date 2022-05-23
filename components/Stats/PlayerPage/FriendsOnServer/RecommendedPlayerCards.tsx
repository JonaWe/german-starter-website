import { players } from '@prisma/client';
import { useQuery } from 'react-query';

import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';
import { fetchPlayersStats } from '../../../../lib/stats/fetch/fetchPlayersStats';
import RecommendedPlayerCard from './RecommendedPlayerCard';

export default function RecommendedPlayerCards({
  steamid,
  cardCount,
}: {
  steamid: string;
  cardCount?: number;
}) {
  const {
    data: friendsOnServer,
    error: friendsError,
    isLoading: friendsLoading,
  } = useFriendsOnServer(steamid);

  const { data: topPlayers } = useQuery('topPlayers', () =>
    fetchPlayersStats(0, 10, null, [
      {
        desc: true,
        id: 'kills',
      },
    ])
  );

  const topPlayerWithTag = (topPlayers?.data as players[])?.map(
    ({ steamid, name }) => {
      return {
        steamid,
        name,
        tags: [
          {
            name,
            className: 'green',
          },
        ],
      };
    }
  );

  const cardItems = friendsOnServer
    ? friendsOnServer
    : friendsLoading
    ? Array(4).fill({})
    : [];

  return (
    <div className="h-52 flex gap-6">
      {cardItems.slice(0, cardCount || 4).map((friend) => (
        <RecommendedPlayerCard
          key={friend.steamid}
          name={friend.name}
          steamid={friend.steamid}
          tags={[{ name: friend.relationship, color: 'green' }]}
        />
      ))}
    </div>
  );
}
