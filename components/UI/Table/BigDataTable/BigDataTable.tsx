//FIXME: #9 Fix type errors for react table https://stackoverflow.com/questions/64608974/react-table-pagination-properties-doesnt-exist-on-type-tableinstance
// @ts-nocheck
import { useEffect, useReducer, useState } from 'react';

import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiFilter,
} from 'react-icons/hi';
import { useQuery } from 'react-query';
import { usePagination, useSortBy, useTable } from 'react-table';
import { useDebounce } from 'use-debounce';

import SimpleListbox from '../../Listbox';
import SearchFiled from './SearchField';

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: 0,
  queryPageFilter: '',
  queryPageSortBy: [
    {
      id: 'kills',
      desc: true,
    },
  ],
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED';
const PAGE_SORT_CHANGED = 'PAGE_SORT_CHANGED';

const pageSelectionOptions = [
  {
    name: '10',
    id: '10',
  },
  {
    name: '20',
    id: '20',
  },
  {
    name: '30',
    id: '30',
  },
  {
    name: '40',
    id: '40',
  },
  {
    name: '50',
    id: '50',
  },
];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    case PAGE_FILTER_CHANGED:
      return {
        ...state,
        queryPageFilter: payload,
      };
    case PAGE_SORT_CHANGED:
      return {
        ...state,
        queryPageSortBy: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default function BigDataTable({
  columns,
  fetchData,
}: {
  columns: any;
  fetchData: any;
}) {
  const [query, setQuery] = useState('');
  const [searchValue] = useDebounce(query, 200);

  const [
    {
      queryPageIndex,
      queryPageSize,
      totalCount,
      queryPageFilter,
      queryPageSortBy,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['data_row', queryPageIndex, queryPageSize, searchValue, queryPageSortBy],
    () =>
      fetchData(queryPageIndex, queryPageSize, searchValue, queryPageSortBy),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  const {
    prepareRow,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: isLoading ? Array(10).fill({}) : data.data,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        sortBy: queryPageSortBy,
      },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: pageIndex });
  }, [pageIndex]);

  useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
    gotoPage(0);
  }, [pageSize, gotoPage]);

  useEffect(() => {
    if (data?.count) {
      dispatch({
        type: TOTAL_COUNT_CHANGED,
        payload: data.count,
      });
    }
  }, [data?.count]);

  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });
    gotoPage(0);
  }, [sortBy, gotoPage]);

  useEffect(() => {
    if (searchValue > 0) {
      dispatch({
        type: PAGE_FILTER_CHANGED,
        payload: searchValue,
      });
      gotoPage(0);
    }
  }, [gotoPage, searchValue]);

  return (
    <>
      <div className="flex justify-between mb-2 items-center">
        {/* <SimpleListbox
          options={pageSelectionOptions}
          setSelected={(selected) => {
            setPageSize(Number(selected.id));
          }}
          selected={pageSize}
        /> */}
        <select
          className="bg-background-150 h-fit p-2"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <SearchFiled value={query} onChange={setQuery} />
      </div>
      <table {...getTableProps()} className="border-collapse w-full">
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps({
                    minWidth: column.minWidth,
                    width: column.width,
                    ...column.getSortByToggleProps(),
                  })}
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
          {page.map((row, rowIndex) => {
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
      <div className="flex justify-between mt-3">
        <span className="text-sm text-background-150">
          Page {pageIndex + 1} of {pageOptions.length} (
          {(pageIndex + 1) * pageSize} of {totalCount})
        </span>
        <div>
          <button
            className="text-2xl disabled:opacity-25 px-1 py-1.5"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <HiChevronDoubleLeft className="hover:fill-sand-500 fill-sand-500/75 transition-colors" />
          </button>
          <button
            className="text-2xl disabled:opacity-25 px-1 py-1.5"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <HiChevronLeft className="hover:fill-sand-500 fill-sand-500/75 transition-colors" />
          </button>
          <button
            className="text-2xl disabled:opacity-25 px-1 py-1.5"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <HiChevronRight className="hover:fill-sand-500 fill-sand-500/75 transition-colors" />
          </button>
          <button
            className="text-2xl disabled:opacity-25 px-1 py-1.5"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <HiChevronDoubleRight className="hover:fill-sand-500 fill-sand-500/75 transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
}
