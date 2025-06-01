import { ItemType } from "./enums/ItemType";

export interface Filter {
    page: number;
    limit: number;
    orderBy: string;
    order: 'asc' | 'desc';
}

export const FilterDefault: Filter = {
    page: 1,
    limit: 5,
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

export interface FilterInventory extends Filter {
    championId?: number;
}



