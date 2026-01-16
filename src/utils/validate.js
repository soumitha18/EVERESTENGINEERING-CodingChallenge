export function validatePositiveNumber(input, fieldName) {
  const value = parseFloat(input);
  if (isNaN(value) || value <= 0) {
    return `${fieldName} must be a number greater than 0`;
  }
  return true;
}
