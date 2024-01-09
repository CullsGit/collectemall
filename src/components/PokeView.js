import "./PokeView.css";
import { useEffect, useState } from "react";
import axios from "axios";
import capitalize from "../helpers/capitalize";
import heightConverter from "../helpers/heightConverter";
import weightConverter from "../helpers/weightConverter";

const PokeView = ({ pokemon, closeModal, isClosing }) => {
  const [pokeData, setPokeData] = useState(null);
  const firstFourMoves = pokemon.moves.slice(0, 4);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
      );
      if (response.data) {
        setPokeData(response.data);
      }
    };
    fetchData();
  }, [pokemon.id]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  return (
    <div className="modal">
      <div className={`modal-content ${isClosing ? "closing" : ""}`}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {pokeData ? (
          <div>
            <h2>{capitalize(pokemon.name)}</h2>
            <p>{pokeData.flavor_text_entries[9].flavor_text}</p>
            {pokeData.evolves_from_species && (
              <p>
                Evolves from: {capitalize(pokeData.evolves_from_species.name)}
              </p>
            )}
            <p>Genus: {pokeData.genera[7].genus}</p>
            <p>Habitat: {capitalize(pokeData.habitat.name)}</p>
            <p>Height: {heightConverter(pokemon.height)}m</p>
            <p>Weight: {weightConverter(pokemon.weight)}kg</p>
            <p>Moves:</p>
            {firstFourMoves.map((item) => (
              <p>{capitalize(item.move.name)}</p>
            ))}
          </div>
        ) : (
          <p>Loading Data...</p>
        )}
        <div>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={`${pokemon.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PokeView;
