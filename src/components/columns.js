import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'Brand',
        Footer: 'Brand',
        accessor: 'brand_name',
        Filter: ColumnFilter
    },
    {
        Header: 'Price',
        Footer: 'Price',
        accessor: 'price',
        Filter: ColumnFilter
    },
    {
        Header: 'Photo',
        Footer: 'Photo',
        accessor: 'photo',
        Filter: ColumnFilter
    }
]