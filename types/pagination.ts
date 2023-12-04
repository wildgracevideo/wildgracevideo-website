export interface PaginationResult<T extends object> {
    page: number,
    totalPages: number,
    totalResults: number,
    results: T[],
    offset: number,
    limit: number,
}
