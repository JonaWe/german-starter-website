import { useMemo } from 'react';

import axios from 'axios';

import BigDataTable from '../../UI/Table/BigDataTable/BigDataTable';

export default function PlayerStatsTable() {
  const columns = useMemo(
    () => [
      { Header: 'Player', accessor: 'steamid' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Kills', accessor: 'kills' },
      { Header: 'PVP Deaths', accessor: 'pvpdeaths' },
      { Header: 'PVE Deaths', accessor: 'pvedeaths' },
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
    <>
      <BigDataTable columns={columns} fetchData={fetchPlayerData} />
    </>
  );
}
