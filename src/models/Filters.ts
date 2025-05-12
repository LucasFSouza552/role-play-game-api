
export interface Filters {
    name?: string;
    role?: number;
    level?: number;
    size: number;
    offset: number;
}

export const defaultFilters: Filters = {
    size: 5,
    offset: 0
};