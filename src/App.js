import { useEffect, useState } from "react";
import "./App.css";
import getPokemon from "./helper functions/getPokemons";
import PokemonCard from "./components/card/PokemonCard";
import CircleLoader from "react-spinners/ClipLoader";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon()
      setPokemons(data)
      setIsLoading(false)
    }

    fetchData()
  }, []);

  return (
    <div className="container">
      {isLoading && <div className="spinner">
        <CircleLoader
          color={"white"} size={50} />
      </div>}
      <div className="cardWrapper">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.id} info={pokemon} />;
        })}
      </div>
    </div>
  );
}

export default App;
