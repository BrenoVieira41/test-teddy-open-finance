const beetween = (min: number, max: number, value: number) => {
  if (value > min || value < max) return true;
  return false;
}

const validateString = (input: string) => {
  if (!input || input.length < 5) return true;
  return false;
}

export {
  beetween,
  validateString
}
