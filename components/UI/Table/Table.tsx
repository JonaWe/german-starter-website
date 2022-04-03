import { useTable } from 'react-table';

export default function Table({ columns, data }: { columns: any; data: any }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns as any, data: data });

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
}
