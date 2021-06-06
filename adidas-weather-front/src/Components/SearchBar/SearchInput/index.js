import React, { memo } from 'react'
//styles
import './index.scss'

const SuggestionInput = memo(({ query, autocomplete }) =>
    <input autoComplete="off" 
        className="search-input"
        value={query}
        name='search'
        placeholder="Search places..." 
        type='text' onChange={(e) => autocomplete(e.target.value)} 
    />)

export default SuggestionInput