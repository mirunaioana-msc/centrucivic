/**
 * Count active filters apart from 'page' and 'search word'
 */
export const countFilters = (queryValues: any): number => {
  return Object.getOwnPropertyNames(queryValues).reduce((total, current) => {
    total +=
      (queryValues as any)[current] &&
      current !== 'page' &&
      current !== 'search' &&
      current !== 'group'
        ? 1
        : 0;
    return total;
  }, 0);
};
