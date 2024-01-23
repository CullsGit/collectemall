import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PokeView from "./PokeView";
import { fetchData } from "../../services/api";

jest.mock("axios");

describe("fetchData", () => {
  it("successfully fetches data from an API", async () => {
    const mockSpeciesData = {
      flavor_text_entries: [{ flavor_text: "Mocked flavor text 1" }],
      evolves_from_species: { name: "preEvolution" },
      genera: [{}, {}, {}, {}, {}, {}, { genus: "Mocked Genus" }],
      habitat: { name: "cave" },
    };

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockSpeciesData })
    );

    await expect(fetchData()).resolves.toEqual(mockSpeciesData);
  });

  it("fetches erroneous data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(fetchData()).rejects.toThrow(errorMessage);
  });
});

describe("PokeView", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    moves: [
      { move: { name: "move1" } },
      { move: { name: "move2" } },
      { move: { name: "move3" } },
      { move: { name: "move4" } },
    ],
    types: [{ type: { name: "grass" } }],
    height: 7,
    weight: 69,
  };

  const mockSpeciesData = {
    flavor_text_entries: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      { flavor_text: "Mocked flavor text 1" },
    ],
    evolves_from_species: { name: "preEvolution" },
    genera: [{}, {}, {}, {}, {}, {}, {}, { genus: "Mocked Genus" }],
    habitat: { name: "cave" },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockSpeciesData });
  });

  it("renders the Pokemon name and flavor text correctly", async () => {
    render(<PokeView pokemon={mockPokemon} />);

    await waitFor(() => {
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("Mocked flavor text 1")).toBeInTheDocument();
    });
  });

  it("renders the Pokemon image and moves correctly", async () => {
    render(<PokeView pokemon={mockPokemon} />);
    const moves = ["Move1", "Move2", "Move3", "Move4"];

    await waitFor(() => {
      expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
      moves.forEach((move) => {
        expect(screen.getByText(move)).toBeInTheDocument();
      });
    });
  });
});
