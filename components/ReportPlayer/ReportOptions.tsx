import { Combobox } from '@headlessui/react';

import { Player } from './Interfaces/Player';
import ReportOption from './ReportOption';

interface ReportOptionsPorps {
  players: Player[];
}

export default function ReportOptions({ players }: ReportOptionsPorps) {
  return (
    <Combobox.Options className="absolute inset-0">
      <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-background-400 bg-background-150 shadow-md m-1">
        {players &&
          players.map((player: Player) => (
            <ReportOption
              name={player.name}
              steamid={player.steamid}
              key={player.steamid}
            />
          ))}
      </div>
    </Combobox.Options>
  );
}
