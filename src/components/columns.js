import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        disableFilters: true
    },
    {
        Header: 'Brand',
        Footer: 'Brand',
        accessor: 'brand_name',
    },
    {
        Header: 'Price',
        Footer: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Photo',
        Footer: 'Photo',
        accessor: 'photo',
        disableFilters: true
    }
]