import { useEffect, useState } from 'react';

import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { HiSearch, HiX } from 'react-icons/hi';
import { useDebouncedCallback } from 'use-debounce';

import useLocalization from '../../hooks/useLocalization';
import isSteamId from '../../lib/steam/isSteamId';
import { Player } from './Interfaces/Player';
import ReportOption from './ReportOption';
import ReportOptions from './ReportOptions';
import SelectPlayer from './SelectPlayer';

export default function ReportPlayer() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const t = useLocalization();

  return (
    <div className="p-10 w-96 flex flex-col">
      moin
      <SelectPlayer setSelected={setSelectedPlayer} selected={selectedPlayer} />
    </div>
  );
}
