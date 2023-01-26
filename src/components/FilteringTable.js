import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import SCRAPED_DATA from './scraped_data.json'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'

export const FilteringTable = () => {
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
        rows,
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
        )


    const { globalFilter } = state

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
                                <div onClick={(e) => e.stopPropagation()}>{column.canFilter ? column.render('Filter'): null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row) => {
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
        </>
    )
}