import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import SCRAPED_DATA from './scraped_data.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

export const ScrapedTable = () => {

    // define the columns and data
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => SCRAPED_DATA, [])

    // define the default column filter
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    // useTable hook to create a table instance with sorting, filtering and pagination
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
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        defaultColumn
    },
        useFilters, // enable column-wise filtering
        useGlobalFilter, // enable global filtering
        useSortBy, // enable sorting
        usePagination // enable pagination
    )

    const { globalFilter, pageIndex, pageSize } = state

    return (
        <>
            {/* Global filter component */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            
            {/* Table */}
            <table {...getTableProps()}>
                {/* Table header */}
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                                    column.render('Header')}
                                    <span>
                                        {(column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : '')}
                                    </span>
                                    {/* Column filter */}
                                    <div onClick={(e) => e.stopPropagation()}>{column.canFilter && column.id !== 'id' && column.id !== 'photo' ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* Table body */}
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell, index) => {
                                            return <td {...cell.getCellProps()}>
                                                {/* Render image for photo column */}
                                                {columns[index].accessor === 'photo' ? <img src={cell.value} alt="product" width="100" height="100" /> : cell.render('Cell')}
                                            </td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>

                {/* Table footer */}
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

            {/* Pagination */}
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span><br></br>

                {/* Go to page input */}
                <span>
                    Go to page: {' '}
                    <input className='input-text' type='number' defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} />
                    <br></br>
                </span>

                {/* Rows per page select */}
                <select className='page-select' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map((pageSize) => (
                            <option className='page-select-option' key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>

                {/* Pagination buttons */}
                <button className='page-buttons' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button className='page-buttons' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous Page</button>
                <button className='page-buttons' onClick={() => nextPage()} disabled={!canNextPage}>Next Page</button>
                <button className='page-buttons' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>

            </div>
        </>
    )
}