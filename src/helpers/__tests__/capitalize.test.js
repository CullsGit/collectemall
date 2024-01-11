import capitalize from "../capitalize";

describe("capitalize function", () => {
  test("capitalizes the first letter of a word", () => {
    const result = capitalize("example");
    expect(result).toBe("Example");
  });

  test("does not modify an already capitalized word", () => {
    const result = capitalize("Test");
    expect(result).toBe("Test");
  });

  test("handles an empty string as expected", () => {
    const result = capitalize("");
    expect(result).toBe("");
  });
});
