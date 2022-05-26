import { useMemo } from 'react';

import { fetchPlayersStats } from '../../../lib/stats/fetch/fetchPlayersStats';
import BigDataTable from '../../UI/Table/BigDataTable/BigDataTable';
import KDCell from './Cells/KDCell';
import NumberCell from './Cells/NumberCell';
import PlayerCell from './Cells/PlayerCell';

export default function PlayerStatsTable() {
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

  return (
    <div className="w-full">
      <BigDataTable columns={columns} fetchData={fetchPlayersStats} />
    </div>
  );
}
