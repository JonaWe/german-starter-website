import useFriendsOnServer from '../../../../hooks/useFriendsOnServer';

export default function FriendCards({ steamid }: { steamid: string }) {
  const { data: friendsOnServer, error: friendsError } =
    useFriendsOnServer(steamid);

  console.log(friendsOnServer);
  return <></>;
}
