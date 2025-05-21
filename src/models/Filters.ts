
export interface Filters {
    name?: string;
    role?: number;
    level?: number;
    size: number;
    offset: number;
    userId?: number;
    orderBy: string;
    order: 'asc' | 'desc';
}

export const defaultFilters: Filters = {
    size: 5,
    offset: 0,
    orderBy: 'id',
    order: 'asc',
};