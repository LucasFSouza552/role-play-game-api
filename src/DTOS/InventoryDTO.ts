import { Inventory } from "../models/Inventory";

export type createInventoryDTO = Omit<Inventory, 'id'>;
export type updateInventoryDTO = Required<Pick<Inventory, 'id' | 'capacity'>>;

