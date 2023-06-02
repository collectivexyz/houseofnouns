export interface Paginated<T> {
  docs: T[];
  limit?: number;
  nextPage?: number;
  page: number;
  prevPage?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  totalDocs?: number;
  totalPages?: number;
}
