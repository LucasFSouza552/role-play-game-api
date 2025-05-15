
export interface Filters {
    name?: string;
    role?: number;
    level?: number;
    size: number;
    offset: number;
    userId?: string;
}

export const defaultFilters: Filters = {
    size: 5,
    offset: 0
};