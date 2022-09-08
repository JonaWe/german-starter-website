import Link from 'next/link';

import useLocalization from '../../../hooks/useLocalization';

export default function LinkedAccount({
  steamUser,
  editable = true,
}: {
  steamUser: any;
  editable?: boolean;
}) {
  const t = useLocalization();
  return (
    <div className="flex gap-2">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://steamcommunity.com/profiles/${steamUser?.steamID}`}
      >
        <div className="flex items-center gap-2 py-2 pl-2 pr-10 bg-background-400/20 w-fit">
          <img src={steamUser?.avatar.small || ''} alt="avatar" />
          <div>
            <p className="leading-none">{steamUser.nickname}</p>
            <p className="text-xs text-sand-500/70">{steamUser.steamID}</p>
          </div>
        </div>
      </a>
      {editable && (
        <Link href="/api/steam/auth">
          <a className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-background-300 hover:bg-background-400">
            {t.user.settings.steamAccount.change}
          </a>
        </Link>
      )}
    </div>
  );
}
