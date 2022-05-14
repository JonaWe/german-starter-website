import { useMemo } from 'react';

import axios from 'axios';

import BigDataTable from '../../UI/Table/BigDataTable/BigDataTable';
import NumberCell from './Cells/NumberCell';
import PlayerCell from './Cells/PlayerCell';

export default function PlayerStatsTable() {
  const columns = useMemo(
    () => [
      { Header: 'Player', accessor: 'name', Cell: PlayerCell },
      { Header: 'Kills', accessor: 'kills', Cell: NumberCell },
      { Header: 'PVP Deaths', accessor: 'pvpdeaths', Cell: NumberCell },
      { Header: 'PVE Deaths', accessor: 'pvedeaths', Cell: NumberCell },
    ],
    []
  );

  const fetchPlayerData = async (
    page: number,
    pageSize: number,
    query: string | null = null,
    sortBy: { desc: boolean; id: string }[]
  ) => {
    const offset = page * pageSize;

    try {
      const response = await axios.post('/api/stats', {
        skip: offset,
        take: pageSize,
        query: query,
        orderBy: sortBy,
      });
      const data = await response.data;

      return data;
    } catch (e) {
      throw new Error(`API error:${(e as Error)?.message}`);
    }
  };

  return (
    <div className="w-full">
      <BigDataTable columns={columns} fetchData={fetchPlayerData} />
    </div>
  );
}
