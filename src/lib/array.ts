export const getWrapped = <T>(array: T[], index: number): T =>
  array[index % array.length];
