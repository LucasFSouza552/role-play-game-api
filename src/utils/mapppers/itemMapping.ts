import { createItemDTO, updateItemDTO } from "../../DTOS/ItemDTO";
import { Item } from "../../models/Item";

export class ItemMapper {
    public static mapItemToDTO(item: Item | createItemDTO): createItemDTO {
        return {
            name: item.name,
            description: item.description,
            priceMin: item.priceMin,
            priceMax: item.priceMax,
            type: item.type
        };
    }

    public static mapItemToDTOList(items: Item[]): createItemDTO[] {
        return items.map(item => this.mapItemToDTO(item));
    }

    public static mapCreateItemToDTO(item: any): createItemDTO {
        return {
            name: item.name,
            description: item.description,
            priceMin: item.priceMin,
            priceMax: item.priceMax,
            type: item.type
        };
    }

    public static mapItemToUpdateDTO(item: any): updateItemDTO {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            priceMin: item.priceMin,
            priceMax: item.priceMax,
            type: item.type
        };
    }
}