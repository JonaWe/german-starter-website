import { HiUserAdd } from 'react-icons/hi';

import useLocalization from '../../../hooks/useLocalization';

export default function LinkAccount() {
  const t = useLocalization();
  return (
    <div className="flex gap-2 items-center h-12">
      <div className="bg-background-400/20 h-full p-2 flex items-center">
        <p className="text-sand-500/30 text-sm">
          {t.user.settings.steamAccount.noLinked}
        </p>
      </div>
      <a
        href="/api/steam/auth"
        className="bg-green-600/60 transition-colors hover:bg-green-600 h-full aspect-square flex justify-center items-center"
      >
        <HiUserAdd className="fill-sand-500/50 text-xl" />
      </a>
    </div>
  );
}
