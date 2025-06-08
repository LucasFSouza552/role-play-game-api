import { createShopDTO, updateShopDTO } from "../../DTOS/ShopDTO";
import { Shop } from "../../models/Shop";

export class ShopMapper {
    public static mapShopToDTO(shop: Shop | createShopDTO): createShopDTO {
        return {
            name: shop.name,
            type: shop.type
        };
    }

    public static mapShopToDTOList(shops: Shop[]): createShopDTO[] {
        return shops.map(shop => this.mapShopToDTO(shop));
    }

    public static mapCreateShopToDTO(shop: any): createShopDTO {
        return {
            name: shop.name,
            type: shop.type
        };
    }

    public static mapShopToUpdateDTO(shop: any): updateShopDTO {
        return {
            id: shop.id,
            name: shop.name,
            type: shop.type,
            inventory: shop.inventory
        };
    }
}
