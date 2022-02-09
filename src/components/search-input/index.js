import React from "react";
import "./style.css";

const SearchPokemon = ({ searchInput, setSearchInput, updateData }) => {
  return (
    <div className="searchBoxWrapper">
      <label className="pokemonLabel">Search Pokémons </label>
      <input
        className="inputBox"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          updateData(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchPokemon;
