/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import getPokemon from "./helper-functions/getPokemons";
import PokemonCard from "./components/card";
import CircleLoader from "react-spinners/ClipLoader";
import { POKEMON_PER_PAGE } from "./constants/constants";
import Pagination from "./components/pagination";
import SearchPokemon from "./components/search-input";
import Sortby from "./components/sort";
import { v4 as getUniqueId } from "uuid";
import debounceWrapper from "./helper-functions/debounceWrapper";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, SetAllPokemons] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [tooglePureComponent, setTooglePureComponent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getPokemon();
      SetAllPokemons(data);
      setCurrentPage(1);
      updatePokemonsForCurrentPage(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      updatePokemonsForCurrentPage(allPokemons);
    } else {
      updatePokemonsForCurrentPage(filteredPokemons);
    }
  }, [currentPage, tooglePureComponent]);

  const updatePokemonsForCurrentPage = (data) => {
    const lastPokemonIndex = Math.ceil(currentPage * POKEMON_PER_PAGE);
    const firstPokemonIndex = Math.ceil(lastPokemonIndex - POKEMON_PER_PAGE);
    setPokemons(data.slice(firstPokemonIndex, lastPokemonIndex));
    setPaginationLength(Math.ceil(data.length / POKEMON_PER_PAGE));
  };

  const setSearchResult = (pokemon) => {
    const searchResult = allPokemons.filter((dataItem) => {
      return dataItem.name.english
        .toLowerCase()
        .includes(pokemon.toLowerCase());
    });
    setFilteredPokemons(searchResult);
    setCurrentPage(1);
    setTooglePureComponent(getUniqueId());
  };

  const updatePokemonList = useCallback(
    debounceWrapper(setSearchResult, 500),
    []
  );

  const sortPokemons = (isAscending) => {
    const sortedPokemons = pokemons.sort((pokemon1, pokemon2) => {
      if (pokemon1.name.english > pokemon2.name.english) return isAscending;
      if (pokemon1.name.english < pokemon2.name.english) return !isAscending;
      return 0;
    });
    setPokemons([...sortedPokemons]);
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner">
          <CircleLoader color={"white"} size={50} />
        </div>
      ) : (
        <div>
          <SearchPokemon
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            updateData={updatePokemonList}
          />
          <Sortby sortPokemons={sortPokemons} />
          <div className="cardWrapper">
            {pokemons.map((pokemon) => {
              return <PokemonCard key={pokemon.id} info={pokemon} />;
            })}
          </div>
        </div>
      )}
      <div>
        <Pagination
          currentPage={currentPage}
          paginationLength={paginationLength}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
