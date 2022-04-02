import { useMemo } from 'react';

import { useTable } from 'react-table';

import { NewsItemWithId } from '../../../pages/admin/news';
import ActionCell from './Cells/ActionCell';
import DateCell from './Cells/DateCell';
import PublishedCell from './Cells/PublishedCell';

interface NewsTableProps {
  articles: NewsItemWithId[];
  local: 'de' | 'en';
}

export default function NewsTable({ articles, local }: NewsTableProps) {
  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: `${local}.title` },
      { Header: 'Release Date', accessor: `releaseDate`, Cell: DateCell },
      { Header: 'Published', accessor: `published`, Cell: PublishedCell },
      { Header: 'Authors', accessor: 'authors' },
      { Header: 'Actions', accessor: '__id', Cell: ActionCell },
    ],
    [local]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns as any, data: articles });

  return (
    <table
      {...getTableProps()}
      className="border-collapse w-full max-w-screen-2xl"
    >
      <thead>
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                {...column.getHeaderProps()}
                key={columnIndex}
                className="text-left font-bold bg-background-400/60 py-3 px-4 uppercase"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={rowIndex}
              className="hover:bg-background-400/20"
            >
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={cellIndex}
                    className="border border-y-background-150 border-x-0 py-3 px-4"
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  /*return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => {
          return (
            <tr key={article.id}>
              <td>{article.de.title}</td>
              <td>
                {article.releaseDate.toDate().toLocaleDateString(local)} at{' '}
                {article.releaseDate.toDate().toLocaleTimeString(local)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );*/
}
