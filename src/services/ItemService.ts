import { ItemType } from "../models/enums/ItemType";
import { createItemDTO, updateItemDTO } from "../DTOS/ItemDTO";
import { Item } from "../models/Item";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { FilterItem } from "../models/Filters";
import { itemsRepo } from "../repositories/RepositoryManager";
import { ItemMapper } from "../utils/mapppers/itemMapping";
import { ThrowsError } from "../errors/ThrowsError";

export class ItemService implements ServiceInterface<createItemDTO, updateItemDTO, Item> {

  async getAll(filter: FilterItem): Promise<Item[]> {
    try {
      const items = await itemsRepo.getAll(filter);
      if (!items) {
        throw new ThrowsError("Items not found", 404);
      }
      return items;
    } catch (error) {
      if (error instanceof ThrowsError) {
        throw error;
      }
      throw new ThrowsError("Internal server error", 500);
    }
  }

  async getById(id: number): Promise<Item> {
    try {
      const item = await itemsRepo.getById(id);
      if (!item) {
        throw new ThrowsError("Item not found", 404);
      }
      return item;
    } catch (error) {
      if (error instanceof ThrowsError) {
        throw error;
      }
      throw new ThrowsError("Internal server error", 500);
    }
  }

  async create(item: createItemDTO): Promise<Item> {
    try {
      const newItem: createItemDTO = ItemMapper.mapCreateItemToDTO(item);

      const createdItem = await itemsRepo.create(newItem);
      if (!createdItem) {
        throw new ThrowsError("Item not created", 404);
      }
      return createdItem;
    } catch (error) {
      if (error instanceof ThrowsError) {
        throw error;
      }
      throw new ThrowsError("Internal server error", 500);
    }
  }

  async update(item: updateItemDTO): Promise<updateItemDTO> {
    try {      
      if (item.type && !Object.values(ItemType).includes(item.type)) {
        throw new ThrowsError("Invalid item type.", 400);
      }

      if (
        item.priceMin != null &&
        item.priceMax != null &&
        item.priceMin > item.priceMax
      ) {
        throw new ThrowsError("The minimum price cannot be greater than the maximum price.", 400);
      }

      const existingItem = await itemsRepo.getById(item.id);
      if (!existingItem) {
        throw new ThrowsError("Item not found", 404);
      }

      const updatedItem = await itemsRepo.update(item);
      if (!updatedItem) {
        throw new ThrowsError("Item not updated", 404);
      }
      return updatedItem;
    } catch (error) {
      if (error instanceof ThrowsError) {
        throw error;
      }
      throw new ThrowsError("Internal server error", 500);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const deletedItem = await itemsRepo.delete(id);
      if (!deletedItem) {
        throw new ThrowsError("Item not deleted", 404);
      }
      return deletedItem;
    } catch (error) {
      if (error instanceof ThrowsError) {
        throw error;
      }
      throw new ThrowsError("Internal server error", 500);
    }
  }
}
