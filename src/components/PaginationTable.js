import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import SCRAPED_DATA from './scraped_data.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => SCRAPED_DATA, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        defaultColumn
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
        )


    const { globalFilter, pageIndex } = state

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                                column.render('Header')}
                                <span>
                                    {(column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : '')}
                                </span>
                                <div onClick={(e) => e.stopPropagation()}>{column.canFilter && column.id !== 'id' && column.id !== 'photo' ? column.render('Filter'): null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell, index) => {
                                        return <td {...cell.getCellProps()}>
                                            {columns[index].accessor === 'photo' ? <img src={cell.value} alt="product" width="100" height="100" /> : cell.render('Cell')}
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps}>
                                {
                                    column.render('Footer')
                                }
                            </td>
                        ))
                        }
                    </tr>
                ))
                }
            </tfoot>
        </table>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span><br></br>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous Page</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
        </div>
        </>
    )
}