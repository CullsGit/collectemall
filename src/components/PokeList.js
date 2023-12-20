import { useEffect, useState } from "react";
import axios from "axios";
import "./PokeList.css";
import capitalize from "../helpers/capitalize";

const PokeList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];
        for (let pokeId = 1; pokeId <= 151; pokeId++) {
          promises.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
          );
        }
        const response = await Promise.all(promises);
        const data = response.map((response) => response.data);
        setPokeData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>PokeList</h1>
      <div className="container">
        {pokeData.map((pokemon) => (
          <div className="pokeCard">
            <p>{capitalize(pokemon.name)}</p>
            <p>Hp: {pokemon.stats[0].base_stat}</p>
            {pokemon.types[1] ? (
              <p>
                Type: {capitalize(pokemon.types[0].type.name)}/
                {capitalize(pokemon.types[1].type.name)}
              </p>
            ) : (
              <p>Type: {capitalize(pokemon.types[0].type.name)}</p>
            )}

            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="stats">
              <p>Atk: {pokemon.stats[1].base_stat}</p>
              <p>Def: {pokemon.stats[2].base_stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeList;
