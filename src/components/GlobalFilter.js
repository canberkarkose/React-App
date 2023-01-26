import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
            <span>
                🔍 {' '}
                <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
            </span>
        </div>
    )
}
