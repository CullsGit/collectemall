import React from "react";
import { render, waitFor, screen, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PokeList from "./PokeList";
import PokeCard from "../PokeCard/PokeCard";

jest.mock("../PokeCard/PokeCard");

let mock;

beforeEach(() => {
  // Reset the mock adapter before each test
  mock = new MockAdapter(axios);

  // Mocking the axios requests for Pokemon 1 to 151
  const mockData = Array.from({ length: 151 }, (_, index) => ({
    id: index + 1,
    name: `Mocked Pokemon ${index + 1}`,
  }));

  mockData.forEach((pokemon) => {
    mock
      .onGet(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .reply(200, pokemon);
  });

  PokeCard.mockImplementation(({ pokemon, openModal }) => (
    <div data-testid="pokeCard">{pokemon.name}</div>
  ));
});

test("renders PokeList without errors", async () => {
  render(<PokeList />);
  // Wait for the axios requests to be mocked and resolved
  await waitFor(() => {
    expect(mock.history.get.length).toBe(151);
  });

  const errorElement = screen.queryByText(/Error:/);
  expect(errorElement).toBeNull();
});

test("renders pokeTitle div and image", () => {
  render(<PokeList />);

  const pokeTitleDiv = screen.getByTestId("pokeTitle");
  const imageElement = screen.getByAltText("CollectEmAll");

  expect(pokeTitleDiv).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
});

test("renders PokeCard components with Pokemon names", async () => {
  render(<PokeList />);

  // Wait for the axios requests to be mocked and resolved
  await waitFor(() => {
    expect(mock.history.get.length).toBe(151);
  });

  // Check that the PokeCard components are rendered with the correct Pokemon names
  const pokeCardComponents = screen.getAllByTestId("pokeCard");
  pokeCardComponents.forEach((_, index) => {
    const pokemonName = screen.getByText(`Mocked Pokemon ${index + 1}`);
    expect(pokemonName).toBeInTheDocument();
  });
});
