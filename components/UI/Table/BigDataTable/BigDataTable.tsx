import { HiChevronDown, HiChevronUp, HiFilter } from 'react-icons/hi';
import { useSortBy, useTable } from 'react-table';

export default function Table({ columns, data }: { columns: any; data: any }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns as any,
        data: data,
      },
      useSortBy
    );

  //FIXME: #3 Find solution for (column as any) with sorting (types for sorting not suportet at the moment)

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
                {...column.getHeaderProps(
                  (column as any).getSortByToggleProps()
                )}
                key={columnIndex}
                className="text-left font-bold bg-background-400/60 py-3 px-4 uppercase group"
              >
                <div className="flex items-center justify-between">
                  {column.render('Header')}
                  <span>
                    {(column as any).isSorted ? (
                      (column as any).isSortedDesc ? (
                        <HiChevronDown className="text-xl fill-sand-400/50" />
                      ) : (
                        <HiChevronUp className="text-xl fill-sand-400/50" />
                      )
                    ) : (
                      <HiFilter className="w-4 h-4 fill-sand-400/50 opacity-0 group-hover:opacity-100 transition" />
                    )}
                  </span>
                </div>
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
}
