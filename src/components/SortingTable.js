import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import SCRAPED_DATA from './scraped_data.json'
import { COLUMNS } from './columns'
import './table.css'

export const SortingTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => SCRAPED_DATA, [])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    },
        useSortBy)

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                                column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : ''}
                                </span>
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
    )
}