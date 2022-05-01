import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';

export default function AuthorInfo({
  author,
  steamUser,
}: {
  author: any;
  steamUser: any;
}) {
  return (
    <div className="w-80 h-full p-5 bg-background-600">
      <h2>Author</h2>
      <div className="flex gap-3 items-center">
        <Avatar className="w-16 h-16" url={author?.photoURL} />
        <div className="flex flex-col">
          <p className="leading-none font-bold">{author?.displayName}</p>
          <p className="text-xs text-sand-500/60">{author?.email}</p>
        </div>
      </div>
      <h3 className="mt-10">Steam profile</h3>

      {steamUser ? (
        <>
          <div className="bg-background-700 p-2 flex gap-3 items-center h-16 w-full">
            <Avatar className="w-12 h-12" url={steamUser?.avatar.medium} />
            <div className="flex flex-col">
              <p className="leading-none font-bold">{steamUser?.nickname}</p>
              <p className="text-xs text-sand-500/60">{author?.steamid}</p>
            </div>
          </div>
          <div className="flex mt-4 gap-3">
            <Button
              text="Steam"
              useLink
              href={`https://steamcommunity.com/profiles/${author?.steamid}`}
            />
            <Button
              text="Stats"
              useLink
              href={`https://playerstats.german-starter.de/player?playerid=${author?.steamid}`}
            />
          </div>
        </>
      ) : (
        <p className="mx-auto text-xs text-sand-500/40">
          no steam profile linked
        </p>
      )}
    </div>
  );
}
