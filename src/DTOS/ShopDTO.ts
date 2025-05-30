import { Shop } from "../models/Shop";

export type createShopDTO = Omit<Shop, 'id'>;
export type updateShopDTO = Required<Pick<Shop, 'id'>> & Partial<Pick<Shop, 'ownerId' | 'name' | 'type' | 'inventory'>>; 