function weightConverter(weight) {
  if (typeof weight !== "number") {
    return "Unknown";
  }

  const kilograms = weight / 10;
  return kilograms;
}

export default weightConverter;
