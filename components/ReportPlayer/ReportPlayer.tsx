import { useEffect, useState } from 'react';

import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { HiSearch, HiX } from 'react-icons/hi';
import { useDebouncedCallback } from 'use-debounce';

import isSteamId from '../../lib/steam/isSteamId';
import { Player } from './Interfaces/Player';
import ReportOption from './ReportOption';
import ReportOptions from './ReportOptions';
import useLocalization from '../../hooks/useLocalization';

export default function ReportPlayer() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const [value, setValue] = useState<Player[]>([]);
  const t = useLocalization();

  const search = async (query: string) => {
    const data = await axios.post('/api/server/searchPlayerByName', {
      name: query,
    });
    return data;
  };

  const fetchPlayer = async (steamId: string) => {
    const data = await axios.post('/api/server/getPlayerById', {
      steamId,
    });
    return data;
  };

  const debounced = useDebouncedCallback((query) => {
    // if (query.length === 0) return setValue([]);

    if (!isSteamId(query)) {
      search(query).then((data) => {
        setValue(data.data.players);
      });
    } else {
      fetchPlayer(query).then((data) => {
        setValue(data.data.player);
      });
    }
  }, 300);

  console.log(value);

  return (
    <div className="p-10 w-96 flex flex-col">
      <Combobox value={selectedPlayer?.name} onChange={setSelectedPlayer}>
        <div className="flex bg-background-200/20 p-2 relative gap-2">
          {selectedPlayer ? (
            <>
              <img
                className="h-14 aspect-square"
                src={selectedPlayer.avatar}
                alt={selectedPlayer.name}
              />
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col justify-center">
                  <p className="text-lg leading-none">{selectedPlayer.name}</p>
                  <p className="text-xs text-sand-500/60 font-light">
                    {selectedPlayer.steamid}
                  </p>
                </div>
                <button onClick={() => setSelectedPlayer(null)}>
                  <HiX className="text-xl opacity-50 hover:opacity-75 transition-opacity" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center px-2">
              <HiSearch className="text-2xl fill-sand-500/70" />
              <Combobox.Input
                onChange={(e) => debounced(e.target.value)}
                placeholder={t.support.report.search}
                className="w-full focus-visible:ring-0 bg-transparent py-3 placeholder:text-sand-500/40"
              />
            </div>
          )}
        </div>
        <div className="relative my-2">
          <ReportOptions players={value} />
        </div>
      </Combobox>
    </div>
  );
}
