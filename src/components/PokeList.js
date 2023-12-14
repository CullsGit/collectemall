import { useEffect, useState } from "react";
import axios from "axios";

const PokeList = () => {
  const [pokeData, setPokeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/35"
        );
        setPokeData(response.data);
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
      {pokeData ? (
        <div>
          <h1>{pokeData.name}</h1>
          <img src={pokeData.sprites.front_default} alt={pokeData.name} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PokeList;
