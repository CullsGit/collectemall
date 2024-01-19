import axios from "axios";

export const fetchData = async (pokemonId) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
