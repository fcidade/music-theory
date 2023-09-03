export const anyOf = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const shuffle = <T>(array: T[]): T[] =>
  array.sort(() => Math.random() > .5 ? -1 : 1);
