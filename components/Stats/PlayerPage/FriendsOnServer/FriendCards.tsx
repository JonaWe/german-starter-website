import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';
import FriendCard from './FriendCard';

export default function FriendCards({
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

  const cardItems = friendsOnServer
    ? friendsOnServer
    : friendsLoading
    ? Array(4).fill({})
    : [];

  return (
    <div className="h-52 flex gap-6">
      {cardItems.slice(0, cardCount || 4).map((friend) => (
        <FriendCard key={friend.steamid} {...friend} />
      ))}
    </div>
  );
}
