import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

// Global search input component
export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter) // State for input value

    // Debounce search input change
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 300)

    return (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
            <span>
                🔍 {' '}
                <input 
                    value={value || ''} 
                    onChange={(e) => {
                        setValue(e.target.value)
                        onChange(e.target.value)
                    }}
                />
            </span>
        </div>
    )
}
