const heightConverter = (decimetres) => {
  if (typeof decimetres !== "number") {
    return "Unknown";
  }

  const centimetres = decimetres / 10;
  return `${centimetres}`;
};

export default heightConverter;
