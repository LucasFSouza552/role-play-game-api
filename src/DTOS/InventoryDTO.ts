import { Inventory } from "../models/Inventory";

export type createInventoryDTO = Omit<Inventory, 'id'>;
