export const anyOf = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const except = <T>(array: T[], ...itemsToExclude: T[]): T[] =>
  array.filter((i) => !itemsToExclude.includes(i));
