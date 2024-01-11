import heightConverter from "../heightConverter";

describe("heightConverter function", () => {
  test("handles invalid input and returns 'Unknown'", () => {
    const result1 = heightConverter("Hello");
    const result2 = heightConverter(true);
    expect(result1).toBe("Unknown");
    expect(result2).toBe("Unknown");
  });

  test("converts decimetres to centimetres correctly", () => {
    expect(heightConverter(30)).toBe("3");
    expect(heightConverter(45)).toBe("4.5");
    expect(heightConverter(20)).toBe("2");
  });
});
