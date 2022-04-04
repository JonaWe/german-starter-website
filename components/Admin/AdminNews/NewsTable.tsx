import { useMemo } from 'react';

import { useTable } from 'react-table';

import { NewsItemWithId } from '../../../pages/admin/news';
import Table from '../../UI/Table/Table';
import ActionCell from './Cells/ActionCell';
import AuthorsCell from './Cells/AuthorsCell';
import DateCell from './Cells/DateCell';
import PublishedCell from './Cells/PublishedCell';
import TitleCell from './Cells/TitleCell';

interface NewsTableProps {
  articles: NewsItemWithId[];
  local: 'de' | 'en';
}

export default function NewsTable({ articles, local }: NewsTableProps) {
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: `${local}.title`, Cell: TitleCell },
      { Header: 'Release Date', accessor: `releaseDate`, Cell: DateCell },
      { Header: 'Published', accessor: `published`, Cell: PublishedCell },
      { Header: 'Authors', accessor: 'authors', Cell: AuthorsCell },
      { Header: 'Actions', accessor: '__id', Cell: ActionCell },
    ],
    [local]
  );

  return <Table columns={columns} data={articles} />;
}
