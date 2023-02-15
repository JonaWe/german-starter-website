import { useMemo, useState } from 'react';

import { fetchPlayersStats } from '../../../lib/stats/fetch/fetchPlayersStats';
import BigDataTable from '../../UI/Table/BigDataTable/BigDataTable';
import KDCell from './Cells/KDCell';
import NumberCell from './Cells/NumberCell';
import PlayerCell from './Cells/PlayerCell';

export default function PlayerStatsTable() {
  const [wipeOnly, setWipeOnly] = useState(true);
  const columns = useMemo(
    () => [
      { Header: 'Player', accessor: 'name', Cell: PlayerCell },
      { Header: 'Kills', accessor: 'kills', Cell: NumberCell },
      { Header: 'Deaths (PvP)', accessor: 'pvpdeaths', Cell: NumberCell },
      { Header: 'K/D', accessor: 'steamid', Cell: KDCell },
      { Header: 'Deaths (PvE)', accessor: 'pvedeaths', Cell: NumberCell },
    ],
    []
  );

  const dropdowns = [
    <select
      className="bg-background-150 h-fit p-2"
      onChange={(e) => setWipeOnly(e.target.value === 'true' ? true : false)}
    >
      <option value="true">Wipe</option>
      <option value="false">All time</option>
    </select>,
  ];

  return (
    <div className="w-full scroll-m-20" id="players">
      {wipeOnly ? (
        <BigDataTable
          dropdowns={dropdowns}
          columns={columns}
          id={'wipe'}
          fetchData={async (
            page: number,
            pageSize: number,
            query: string | null = null,
            sortBy: { desc: boolean; id: string }[],
            timeOut?: number
          ) =>
            fetchPlayersStats(page, pageSize, query, sortBy, timeOut, wipeOnly)
          }
        />
      ) : (
        <BigDataTable
          dropdowns={dropdowns}
          columns={columns}
          fetchData={fetchPlayersStats}
        />
      )}
    </div>
  );
}
