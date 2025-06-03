import { createInventoryDTO, updateInventoryDTO } from "../../DTOS/InventoryDTO";
import { Inventory } from "../../models/Inventory";


export class InventoryMapper {
	public static mapInventoryToDTO(inventory: Inventory): Inventory {
		return {
			id: inventory.id,
			ownerId: inventory.ownerId,
			capacity: inventory.capacity,
			...(inventory.itens && {itens: inventory.itens })
		}
	}

	public static mapInventoryToDTOList(inventory: Inventory[]): Inventory[] {
		return inventory.map(this.mapInventoryToDTO)
	}

	public static mapCreateInventoryToDTO(inventory: Inventory | createInventoryDTO): createInventoryDTO {
		return {
			ownerId: inventory.ownerId,
			capacity: inventory.capacity,
		};
	}

	public static mapInventoryToUpdateDTO(inventory: Inventory | updateInventoryDTO): updateInventoryDTO {
		return {
			id: inventory.id,
			capacity: inventory.capacity
		};
	}
}
