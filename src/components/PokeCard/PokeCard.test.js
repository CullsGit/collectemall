import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokeCard from "./PokeCard";

const dummyPokemon = {
  name: "bulbasaur",
  types: [{ type: { name: "grass" } }],
  stats: [{ base_stat: 45 }, { base_stat: 49 }, { base_stat: 49 }],
  sprites: {
    front_default: "front_default_image_url",
    back_default: "back_default_image_url",
  },
  id: 1,
};

const mockOpenModal = jest.fn();

describe("PokeCard", () => {
  it("renders PokeCard component with dummy data", () => {
    render(<PokeCard pokemon={dummyPokemon} openModal={mockOpenModal} />);

    const pokeNameElement = screen.getByText(/bulbasaur/i);
    expect(pokeNameElement).toBeInTheDocument();

    const typesElement = screen.getByText(/grass/i);
    const hpStatElement = screen.getByText(/hp: 45/i);
    const atkStatElement = screen.getByText(/atk: 49/i);
    const defStatElement = screen.getByText(/def: 49/i);
    expect(typesElement).toBeInTheDocument();
    expect(hpStatElement).toBeInTheDocument();
    expect(atkStatElement).toBeInTheDocument();
    expect(defStatElement).toBeInTheDocument();

    const viewButtonElement = screen.getByText(/view pokemon/i);
    expect(viewButtonElement).toBeInTheDocument();
  });

  it("handles mouse enter and mouse leave events", async () => {
    render(<PokeCard pokemon={dummyPokemon} openModal={mockOpenModal} />);

    const pokeImage = screen.getByAltText(/bulbasaur/i);

    await waitFor(() => {
      expect(pokeImage).toHaveAttribute("src", "front_default_image_url");
    });

    act(() => {
      userEvent.hover(pokeImage);
    });

    await waitFor(() => {
      expect(pokeImage).toHaveAttribute("src", "back_default_image_url");
    });

    act(() => {
      userEvent.unhover(pokeImage);
    });

    await waitFor(() => {
      expect(pokeImage).toHaveAttribute("src", "front_default_image_url");
    });
  });

  it('calls openModal function when "View Pokemon" button is clicked', () => {
    render(<PokeCard pokemon={dummyPokemon} openModal={mockOpenModal} />);

    const viewButton = screen.getByText(/view pokemon/i);

    act(() => {
      userEvent.click(viewButton);
    });

    expect(mockOpenModal).toHaveBeenCalled();
  });
});
