import weightConverter from "../weightConverter";

describe("weightConverter", () => {
  it("should convert valid weight to kilograms", () => {
    const result = weightConverter(200);
    expect(result).toBe(20);
  });

  it("should convert zero weight to kilograms", () => {
    const result = weightConverter(0);
    expect(result).toBe(0);
  });

  it("should handle invalid input (non-numeric)", () => {
    const result = weightConverter("abc");
    expect(result).toBe("Unknown");
  });

  it("should handle decimal weight", () => {
    const result = weightConverter(15.5);
    expect(result).toBe(1.55);
  });
});
