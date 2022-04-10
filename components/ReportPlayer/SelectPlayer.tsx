import { useState } from 'react';

import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { HiSearch, HiX } from 'react-icons/hi';
import { useDebouncedCallback } from 'use-debounce';

import useLocalization from '../../hooks/useLocalization';
import isSteamId from '../../lib/steam/isSteamId';
import { Player } from './Interfaces/Player';
import ReportOptions from './ReportOptions';

interface SelectPlayerProps {
  setSelected: any;
  selected: Player | null | undefined;
}

export default function SelectPlayer({
  setSelected,
  selected,
}: SelectPlayerProps) {
  const [value, setValue] = useState<Player[]>([]);
  const t = useLocalization();

  const search = async (query: string) => {
    const data = await axios
      .post('/api/server/searchPlayerByName', {
        name: query,
      })
      .catch((error) => {
        return { data: { data: { players: [] } } };
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

  return (
    <Combobox value={selected?.name} onChange={setSelected}>
      <div className="flex bg-background-200/20 p-2 relative gap-2 z-10">
        {selected ? (
          <>
            <img
              className="h-12 aspect-square"
              src={selected.avatar}
              alt={selected.name}
            />
            <div className="flex justify-between flex-grow">
              <div className="flex flex-col justify-center">
                <p className="text-lg leading-none">{selected.name}</p>
                <p className="text-xs text-sand-500/60 font-light">
                  {selected.steamid}
                </p>
              </div>
              <button onClick={() => setSelected(null)}>
                <HiX className="text-md opacity-50 hover:opacity-75 transition-opacity" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center px-2">
            <HiSearch className="text-2xl fill-sand-500/70" />
            <Combobox.Input
              onChange={(e) => debounced(e.target.value)}
              placeholder={t.support.report.search}
              className="w-full focus-visible:ring-0 bg-transparent py-3 placeholder:text-sand-500/40 text-sm"
            />
          </div>
        )}
      </div>
      <div className="relative my-2">
        <ReportOptions players={value} />
      </div>
    </Combobox>
  );
}
