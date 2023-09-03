export const getWrapped = <T>(array: T[], index: number): T =>
  array[index % array.length];

export const except = <T>(array: T[], ...itemsToExclude: T[]): T[] =>
  array.filter((i) => !itemsToExclude.includes(i));
