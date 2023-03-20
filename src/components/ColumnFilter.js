import React from 'react'

// Column filter component
export const ColumnFilter = ({ column }) => {
    // Destructure the column object
    const { filterValue, setFilter } = column
  return (
    // Filter input
    <span>
        🔍 {' '}
        <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}
