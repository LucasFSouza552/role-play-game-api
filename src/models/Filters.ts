import { ItemType } from "./enums/ItemType";

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

export interface FilterItem extends Filter {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface FilterShop extends Filter {
    name?: string;
    userId?: number;
    type?: ItemType;
}



