const beetween = (min: number, max: number, value: number) => {
  if (value > min || value < max) return true;
  return false;
}

const validateString = (input: string) => {
  if (!input || input.length < 5) return true;
  return false;
}

const validateEmail = (email: string) => {
  const emailRegex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);

  if (!email || !emailRegex.test(email)) return true;

  return false;
}

export {
  beetween,
  validateString,
  validateEmail
}
