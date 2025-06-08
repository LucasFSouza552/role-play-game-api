import { Shop } from "../models/Shop";

export type createShopDTO = Omit<Shop, 'id' | 'inventory'>;
export type updateShopDTO = Required<Pick<Shop, 'id'>> & Partial<Pick<Shop, 'name' | 'type' | 'inventory'>>; 