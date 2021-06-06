import React, { useState } from 'react'
//components
import SearchListItem from './SearchListItem'
import SearchInput from './SearchInput'
//styles
import './index.scss'

const SearchBar = ({ autocomplete, searchCity, itemList = [] }) => {
    const [query, setQuery] = useState('');

    const handleAutocomplete = (_query) => {
        setQuery(_query)
        autocomplete(_query)
    }

    const isSearching = () => itemList.length > 0 && query

    return (
        <div className="search-bar">
            <SearchInput query={query} autocomplete={handleAutocomplete} />
            {isSearching() && itemList.map(({ city, country }) => <SearchListItem onClick={() => searchCity(city, country)} searchCity={searchCity} place={`${city} , ${country}`} query={query} />)}
        </div >
    );
}

export default SearchBar