import { useMemo } from 'react';

import DateCell from '../../Admin/AdminNews/Cells/DateCell';
import Table from '../../UI/Table/Table';

interface AliasTableProps {
  aliases: Alias[];
}

interface Alias {
  steamid: string;
  time: number;
  alias: string;
}

export default function AliasTable({ aliases }: AliasTableProps) {
  const columns = useMemo(
    () => [
      { Header: 'Alias', accessor: 'alias' },
      { Header: 'Time', accessor: 'time', Cell: DateCell },
    ],
    []
  );

  return <Table columns={columns} data={aliases} />;
}
