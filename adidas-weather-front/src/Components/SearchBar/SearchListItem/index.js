import React from 'react'
//styles
import './index.scss'

const SearchListItem = ({ onClick, place, query }) =>
    <li className='search-list__item' onClick={onClick} >
        {(() => {
            const ocurrence = place.toUpperCase().indexOf(query.toUpperCase());
            if (ocurrence >= 0) {
                return [place.substring(0, ocurrence), <strong key={place.id}>{place.substring(ocurrence, ocurrence + query.length)}</strong>, place.substring(ocurrence + query.length)]
            }
            return place
        })()}
    </li>

export default SearchListItem