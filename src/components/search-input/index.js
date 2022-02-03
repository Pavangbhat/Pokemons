import React from 'react';
import "./style.css"

const SearchPokemon = ({ searchInput, setSearchResult }) => {
    return (
        <div className='searchBoxWrapper'>
            <label className='pokemonLabel'>Search Pokémons </label>
            <input className='inputBox' value={searchInput} onChange={(e) => {
                setSearchResult(e.target.value)
            }} />
        </div>
    )

};

export default SearchPokemon;
