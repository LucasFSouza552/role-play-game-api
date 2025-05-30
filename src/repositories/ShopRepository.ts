import { createShopDTO, updateShopDTO } from "../DTOS/ShopDTO";
import { RepositoryInterface } from "../interfaces/repositoryInterface";
import { Filter } from "../models/Filters";
import { Shop } from "../models/Shop";

export class ShopRepository implements RepositoryInterface<createShopDTO, updateShopDTO, Shop> {
    private tableName = 'shop';
    getAll(filter?: Filter): Promise<Shop[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number, userId?: number): Promise<Shop> {
        throw new Error("Method not implemented.");
    }
    create(shop: createShopDTO): Promise<Shop> {
        throw new Error("Method not implemented.");
    }
    update(shop: updateShopDTO): Promise<updateShopDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number, userId?: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}