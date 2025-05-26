import { Item } from "../models/Item";

//DTO principal para transferência de dados de Item.

export type createItemDTO = Omit<Item, "id">;
export type updateItemDTO = Required<Pick<Item, 'id'>> & Partial<Pick<Item, 'name' | 'description' | 'priceMin' | 'priceMax' | 'type'>>;