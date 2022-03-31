import { useEffect, useState } from 'react';

import axios from 'axios';
import { HiUserAdd } from 'react-icons/hi';

import useLocalization from '../../../hooks/useLocalization';
import useSteamUser from '../../../hooks/useSteamUser';
import useUserSettigns from '../../../hooks/useUserSettigns';
import Button from '../../UI/Button';
import Info from '../../UI/Info';
import Section from './Section';

export default function UserSettings() {
  const t = useLocalization();
  const [settings] = useUserSettigns();
  const [steamUser, setSteamUser] = useState<any>();

  const fetchPlayer = async (steamid: string) => {
    const data = await axios.post('/api/steam/getPlayerSummary', {
      steamid,
    });
    return data;
  };

  useEffect(() => {
    if (!settings) return;
    fetchPlayer(settings.steamid).then((data) => {
      setSteamUser(data.data.summary);
    });
  });

  //FIXME: #2 Optimize requesting steam user, it is currentli requestet on each tab chage (should use ract query)

  return (
    <>
      <Section title="User">
        <p className="text-sm">cool</p>
      </Section>
      <Section title="Steam account">
        <p className="text-sm">{t.user.settings.steamAccount.info}</p>
        <h4 className="font-sans font-semibold mt-3">
          {t.user.settings.steamAccount.linkedTitle}
        </h4>
        <div className="flex gap-2">
          {steamUser ? (
            <div className="flex gap-2">
              <a
                target="_blank"
                href={`https://steamcommunity.com/profiles/${settings?.steamid}`}
              >
                <div className="flex items-center gap-2 py-2 pl-2 pr-10 bg-background-400/20 w-fit">
                  <img src={steamUser?.avatar.small || ''} alt="avatar" />
                  <div>
                    <p className="leading-none">{steamUser.nickname}</p>
                    <p className="text-xs text-sand-500/70">
                      {steamUser.steamID}
                    </p>
                  </div>
                </div>
              </a>
              <a
                className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-background-300 hover:bg-background-400"
                href="/api/steam/auth"
              >
                {t.user.settings.steamAccount.change}
              </a>
            </div>
          ) : (
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
          )}
        </div>
      </Section>
    </>
  );
}
