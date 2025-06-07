import { ItemType } from "../models/enums/ItemType";
import { createItemDTO, updateItemDTO } from "../DTOS/ItemDTO";
import { Item } from "../models/Item";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { FilterItem } from "../models/Filters";
import { itemsRepo } from "../repositories/RepositoryManager";
import { ItemMapper } from "../utils/mapppers/itemMapping";

// Camada de regras de negócio dos itens.

export class ItemService implements ServiceInterface<createItemDTO, updateItemDTO, Item> {

  // Busca todos os itens com filtros opcionais.

  async getAll(filter: FilterItem): Promise<Item[]> {
    try {
      return await itemsRepo.getAll(filter);
    } catch (error) {
      throw new Error('Error fetching items');
    }
  }

  // Busca um item pelo ID.

  async getById(id: number): Promise<Item> {
    try {
      return await itemsRepo.getById(id);
    } catch (error) {
      throw new Error('Error fetching item');
    }
  }

  // Cria um novo item a partir do DTO recebido.
  // Valida campos obrigatórios e enums.

  async create(item: createItemDTO): Promise<Item> {
    try {
      const newItem: createItemDTO = ItemMapper.mapCreateItemToDTO(item);

      return await itemsRepo.create(newItem);
    } catch (error) {
      throw new Error('Error creating item');
    }
  }

  // Atualiza um item existente, se ele existir..
  async update(item: updateItemDTO): Promise<updateItemDTO> {

    // Validação dos enums, se enviados
    if (item.type && !Object.values(ItemType).includes(item.type)) {
      throw new Error("Invalid item type.");
    }

    // Validação de preço mínimo e máximo, se ambos enviados
    if (
      item.priceMin != null &&
      item.priceMax != null &&
      item.priceMin > item.priceMax
    ) {
      throw new Error("The minimum price cannot be greater than the maximum price.");
    }

    const existingItem = await itemsRepo.getById(item.id);
    if (!existingItem) {
      throw new Error('Item not found');
    }

    const updatedItem: updateItemDTO = ItemMapper.mapItemToUpdateDTO(item);

    return await itemsRepo.update(updatedItem);
  }

  // Deleta um item pelo ID, se ele existir.
  async delete(id: number): Promise<boolean> {
    try {
      const deletedItem = await itemsRepo.delete(id);
      return deletedItem;
    } catch (error) {
      throw new Error('Error deleting item');
    }
  }
}
