function divide(a: number, b: number) {
  if (b === 0) throw new Error('Cannot divide by 0');

  return a / b;
}
export default divide;
