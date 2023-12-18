import { useEffect, useState } from "react";
import axios from "axios";
import "./PokeList.css";

const PokeList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];
        for (let pokeId = 1; pokeId <= 152; pokeId++) {
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

  console.log(pokeData[1]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>PokeList</h1>
      <div className="container">
        {pokeData.map((pokemon) => (
          <div className="pokeCard">
            <h3>{pokemon.name}</h3>
            <h3>Hp: {pokemon.stats[0].base_stat}</h3>
            {pokemon.types[1] ? (
              <h3>
                Type: {pokemon.types[0].type.name}/{pokemon.types[1].type.name}
              </h3>
            ) : (
              <h3>Type: {pokemon.types[0].type.name}</h3>
            )}

            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>Atk: {pokemon.stats[1].base_stat}</h3>
            <h3>Def: {pokemon.stats[2].base_stat}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeList;
