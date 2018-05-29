export function getWholeNumberUnder(max: number) {
  return Math.floor(Math.random() * max);
}

export function getWholeNumberInRange(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}
