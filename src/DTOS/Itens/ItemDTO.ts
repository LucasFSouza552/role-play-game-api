import { Item } from "../../models/Item";

//DTO principal para transferência de dados de Item.
export type ItemDTO = Omit<Item, 'id'>;