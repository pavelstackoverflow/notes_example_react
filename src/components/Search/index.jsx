import React from 'react';

const Search = ({setSearchText}) => {

    return (
        <div className="content__search">
            <input className="input-text" placeholder="search" onChange={e => (setSearchText(e.target.value))} />
        </div>
    )
}

export default Search