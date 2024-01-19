import axios from "axios";

import { fetchData } from "../../services/api";

jest.mock("axios");

describe("fetchData", () => {
  it("successfully fetches data from an API", async () => {
    const mockSpeciesData = {
      flavor_text_entries: [{ flavor_text: "Mocked flavor text 1" }],
      evolves_from_species: { name: "preEvolution" },
      genera: [{ genus: "Mocked Genus" }],
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
