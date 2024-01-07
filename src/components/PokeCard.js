import "./PokeCard.css";
import capitalize from "../helpers/capitalize";
import { useState } from "react";

const PokeCard = ({ pokemon, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const type = pokemon.types[0].type.name;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="pokeCard" id={type}>
      <p id="pokeName">{capitalize(pokemon.name)}</p>
      <div className="stats">
        {pokemon.types[1] ? (
          <p>
            {capitalize(type)}/{capitalize(pokemon.types[1].type.name)}
          </p>
        ) : (
          <p>{capitalize(type)}</p>
        )}
        <p>Hp: {pokemon.stats[0].base_stat}</p>
      </div>

      <img
        id="pokeImage"
        src={
          isHovered
            ? pokemon.sprites.back_default
            : pokemon.sprites.front_default
        }
        alt={pokemon.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="stats">
        <p>Atk: {pokemon.stats[1].base_stat}</p>
        <p>Def: {pokemon.stats[2].base_stat}</p>
      </div>
      <button
        className="viewButton"
        id={type}
        value={pokemon.id - 1}
        onClick={openModal}
      >
        View Pokemon
      </button>
    </div>
  );
};

export default PokeCard;
