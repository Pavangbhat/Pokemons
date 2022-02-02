import { useEffect, useState } from "react";
import "./App.css";
import getPokemon from "./helper functions/getPokemons";
import PokemonCard from "./components/card";
import CircleLoader from "react-spinners/ClipLoader";
import { POKEMON_PER_PAGE } from "./constants/constants";
import Pagination from "./components/pagination";


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLength, setPaginationLength] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getPokemon()
      const lastPokemonIndex = Math.ceil(currentPage * POKEMON_PER_PAGE)
      const firstPokemonIndex = Math.ceil(lastPokemonIndex - POKEMON_PER_PAGE)
      setPokemons(data.slice(firstPokemonIndex, lastPokemonIndex))
      setPaginationLength(Math.ceil(data.length / POKEMON_PER_PAGE))
      setIsLoading(false)
    }

    fetchData()
  }, [currentPage]);

  return (
    <div className="container">
      {isLoading ?
        <div className="spinner">
          <CircleLoader
            color={"white"} size={50} />
        </div> :
        <div className="cardWrapper">
          {pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.id} info={pokemon} />;
          })}
        </div>
      }
      <div>
        <Pagination currentPage={currentPage} paginationLength={paginationLength} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
