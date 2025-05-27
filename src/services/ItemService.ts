import { ItemType } from "../models/enums/ItemType";
import { createItemDTO, updateItemDTO } from "../DTOS/ItemDTO";
import { Item } from "../models/Item";
import { ServiceInterface } from "../interfaces/serviceInterface";
import { ItemRepository } from "../repositories/ItemRepository";
import { FilterItem } from "../models/Filters";

const itemRepository = new ItemRepository();

// Camada de regras de negócio dos itens.

export class ItemService implements ServiceInterface<createItemDTO, updateItemDTO, Item> {

  // Busca todos os itens com filtros opcionais.

  async getAll(filter: FilterItem): Promise<Item[]> {
    try {
      return await itemRepository.getAll(filter);
    } catch (error) {
      throw new Error('Error fetching items');
    }
  }

  // Busca um item pelo ID.

  async getById(id: number): Promise<Item> {
    try {
      return await itemRepository.getById(id);
    } catch (error) {
      throw new Error('Error fetching item');
    }
  }

  // Cria um novo item a partir do DTO recebido.
  // Valida campos obrigatórios e enums.

  async create(item: createItemDTO): Promise<Item> {
    try {
      // Monta o objeto conforme o modelo/tabela
      // TODO: Adicionar MAPPER
      const newItem: createItemDTO = {
        name: item.name,
        description: item.description,
        priceMin: item.priceMin,
        priceMax: item.priceMax,
        type: item.type,
      };

      return await itemRepository.create(newItem);
    } catch (error) {
      throw new Error('Error creating item');
    }
  }

  // Atualiza um item existente, se ele existir..
  async update(item: updateItemDTO): Promise<updateItemDTO> {

    // Validação dos enums, se enviados
    if (item.type && !Object.values(ItemType).includes(item.type)) {
      throw new Error("Tipo de item inválido.");
    }

    // Validação de preço mínimo e máximo, se ambos enviados
    if (
      item.priceMin != null &&
      item.priceMax != null &&
      item.priceMin > item.priceMax
    ) {
      throw new Error("O preço mínimo não pode ser maior que o preço máximo.");
    }

    const existingItem = await itemRepository.getById(item.id);
    if (!existingItem) {
      throw new Error('Item not found');
    }

    // Atualiza apenas os campos enviados
    // TODO: Adicionar MAPPER
    const updatedItem: updateItemDTO = {
      name: item.name ?? existingItem.name,
      description: item.description ?? existingItem.description,
      priceMin: item.priceMin ?? existingItem.priceMin,
      priceMax: item.priceMax ?? existingItem.priceMax,
      type: item.type ?? existingItem.type,
      id: item.id
    };

    return await itemRepository.update(updatedItem);
  }

  // Deleta um item pelo ID, se ele existir.
  async delete(id: number): Promise<boolean> {
    try {
      const deletedItem = await itemRepository.delete(id);
      return deletedItem;
    } catch (error) {
      throw new Error('Error deleting item');
    }
  }
}
