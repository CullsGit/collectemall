import { useEffect, useState } from "react";
import axios from "axios";
import "./PokeList.css";
import PokeView from "../PokeView/PokeView";
import PokeCard from "../PokeCard/PokeCard";
import pokeTitle from "../../assets/images/poketitle.png";

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
      <div className="pokeTitle" data-testid="pokeTitle">
        <img src={pokeTitle} alt="CollectEmAll" />
      </div>
      <div className="container">
        {pokeData.map((pokemon) => (
          <PokeCard
            key={pokemon.id}
            pokemon={pokemon}
            openModal={openModalHandler}
          />
        ))}
      </div>
      {openPokeModal && (
        <PokeView
          pokemon={selectedPoke}
          closeModal={closeModalHandler}
          isClosing={isModalClosing}
        />
      )}
    </div>
  );
};

export default PokeList;
