export interface Filter {
    size: number;
    offset: number;
    orderBy: string;
    order: 'asc' | 'desc';
}

export const FilterDefault: Filter = {
    size: 5,
    offset: 0,
    orderBy: 'id',
    order: 'asc',
};

export interface FilterChampion extends Filter {
    name?: string;
    role?: number;
    level?: number;
    userId?: number;
}

export interface FilterChampionRole extends Filter {
    name?: string;
}




