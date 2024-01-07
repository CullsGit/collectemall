import { useEffect, useState } from "react";
import axios from "axios";
import "./PokeList.css";
import capitalize from "../helpers/capitalize";
import PokeView from "./PokeView";
import pokeTitle from "../assets/images/poketitle.png";

const PokeList = () => {
  const [pokeData, setPokeData] = useState([]);
  const [error, setError] = useState(null);
  const [openPokeModal, setOpenPokeModal] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);

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

  const openModalHandler = (event) => {
    setOpenPokeModal(true);
    setSelectedPoke(pokeData[event.target.value]);
    setIsModalClosing(false);
  };

  const closeModalHandler = () => {
    setIsModalClosing(true);

    setTimeout(() => {
      setSelectedPoke(null);
      setOpenPokeModal(false);
      setIsModalClosing(false);
    }, 200);
  };

  return (
    <div>
      <div className="pokeTitle">
        <img src={pokeTitle} alt="No image" />
      </div>
      <div className="container">
        {pokeData.map((pokemon) => (
          <div className="pokeCard" id={pokemon.types[0].type.name}>
            <p id="pokeName">{capitalize(pokemon.name)}</p>
            <div className="stats">
              {pokemon.types[1] ? (
                <p>
                  {capitalize(pokemon.types[0].type.name)}/
                  {capitalize(pokemon.types[1].type.name)}
                </p>
              ) : (
                <p>{capitalize(pokemon.types[0].type.name)}</p>
              )}
              <p>Hp: {pokemon.stats[0].base_stat}</p>
            </div>

            <img
              id="pokeImage"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <div className="stats">
              <p>Atk: {pokemon.stats[1].base_stat}</p>
              <p>Def: {pokemon.stats[2].base_stat}</p>
            </div>
            <button
              className="viewButton"
              id={pokemon.types[0].type.name}
              value={pokemon.id - 1}
              onClick={openModalHandler}
            >
              View Pokemon
            </button>
          </div>
        ))}
      </div>
      {openPokeModal && (
        <PokeView
          poke={selectedPoke}
          closeModal={closeModalHandler}
          isClosing={isModalClosing}
        />
      )}
    </div>
  );
};

export default PokeList;
