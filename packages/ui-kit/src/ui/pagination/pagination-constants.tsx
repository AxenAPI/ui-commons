export const PAGINATION_SIZE_OPTIONS = [5, 10, 20, 50, 100];

export const getPaginationSizeOptions = (paginationSizeOptions: string[] | number[] = PAGINATION_SIZE_OPTIONS) =>
  paginationSizeOptions?.map(option => ({
    label: option,
    value: option,
  }));
