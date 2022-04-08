import useSteamUser from '../../../hooks/useSteamUser';
import Avatar from '../../UI/Avatar';
import Button from '../../UI/Button';

export default function ReportedPlayer({ id }: { id: string }) {
  const [player] = useSteamUser(id);
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12" url={player?.avatar.medium} />
        <div className="flex flex-col">
          <p className="leading-none font-bold">{player?.nickname || '-'}</p>
          <p className="text-xs text-sand-500/60">{id || '-'}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          text="Steam"
          useLink
          href={`https://steamcommunity.com/profiles/${id}`}
        />
        <Button
          text="Stats"
          useLink
          href={`https://playerstats.german-starter.de/player?playerid=${id}`}
        />
      </div>
    </div>
  );
}
