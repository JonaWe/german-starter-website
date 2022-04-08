import { useMemo } from 'react';

import { useTable } from 'react-table';

import { NewsItemWithId } from '../../../pages/admin/news';
import { TicketWithId } from '../../../pages/admin/reports';
import Table from '../../UI/Table/Table';
import ActionCell from './Cells/ActionCell';
import AuthorCell from './Cells/AuthorCell';
import DescriptionCell from './Cells/DescriptionCell';
import StatusCell from './Cells/StatusCell';
import TypeCell from './Cells/TypeCell';

interface ReportsTableProps {
  tickets: TicketWithId[];
  local: 'de' | 'en';
}

export default function ReportsTable({ tickets, local }: ReportsTableProps) {
  const columns = useMemo(
    () => [
      { Header: 'Author', accessor: `author`, Cell: AuthorCell },
      { Header: 'Description', accessor: `description`, Cell: DescriptionCell },
      { Header: 'Type', accessor: 'type', Cell: TypeCell },
      { Header: 'Status', accessor: `status`, Cell: StatusCell },
      { Header: 'Actions', accessor: '__id', Cell: ActionCell },
    ],
    [local]
  );

  return <Table columns={columns} data={tickets} />;
}
