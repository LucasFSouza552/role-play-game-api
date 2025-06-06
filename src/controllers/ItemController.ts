import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { ItemType } from "../models/enums/ItemType";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Item } from "../models/Item";
import { FilterDefault, FilterItem } from "../models/Filters";
import { ItemMapper } from "../utils/mapppers/itemMapping";

const itemService = new ItemService();
// Controller responsável por gerenciar requisições relacionadas a itens
export class ItemController implements ControllerInterface {

  // Lista todos os itens, com filtros opcionais por nome e preço
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filter: FilterItem = { ...FilterDefault, ...req.query };
      const items = await itemService.getAll(filter);
      // Mapeia a lista de itens para DTOs
      const itemsDTO = ItemMapper.mapItemToDTOList(items);
      res.status(200).json(itemsDTO);
    } catch (error) {
      res.status(500).json({ error: "Error fetching items" });
    }
  }

  // Busca um item pelo ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const ItemId = parseInt(req.params.id, 10);

      if (!ItemId) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const item = await itemService.getById(ItemId);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
      }
      // Mapeia o item para DTO
      const itemDTO = ItemMapper.mapItemToDTO(item);
      res.status(200).json(itemDTO);
    } catch {
      res.status(500).json({ error: "Error fetching item" });
    }
  }

  // Cria um novo item, validando campos obrigatórios e enums
  async create(req: Request, res: Response): Promise<void> {
    try {
      const item: Item = req.body;

      // Validação dos campos obrigatórios
      if (
        !item.name ||
        !item.description ||
        item.priceMin == null ||
        item.priceMax == null ||
        !item.type
      ) {
        res.status(400).json({ error: "All required fields must be filled." });
        return;
      }

      // Validação dos enums
      const validTypes = Object.values(ItemType) as string[];
      if (!validTypes.includes(item.type)) {
        res.status(400).json({ error: "Invalid item type." });
        return;
      }

      // Regra de negócio: preço mínimo não pode ser maior que o máximo
      if (item.priceMin > item.priceMax) {
        res.status(400).json({ error: "The minimum price cannot be greater than the maximum price." });
        return;
      }

      // Utiliza o mapper para criar o DTO
      const itemDTO = ItemMapper.mapCreateItemToDTO(item);
      const newItem = await itemService.create(itemDTO);
      res.status(201).json(newItem);
    } catch {
      res.status(500).json({ error: "Error creating item" });
    }
  }

  // Atualiza um item existente, validando regras de negócio
  async update(req: Request, res: Response): Promise<void> {
    try {
      const ItemId = req.params.id;
      const item: Item = req.body;

      if (!ItemId || !item) {
        res.status(400).json({ error: "Invalid item ID or data." });
        return;
      }

      // Validação de preço mínimo e máximo
      if (item.priceMin != null && item.priceMax != null && item.priceMin > item.priceMax && item.priceMin !== item.priceMax) {
        res.status(400).json({ error: "The minimum price cannot be greater than the maximum price." });
        return;
      }
      // Validação dos enums, se enviados
      const validTypes = Object.values(ItemType) as string[];
      if (item.type && !validTypes.includes(item.type)) {
        res.status(400).json({ error: "Invalid item type." });
        return;
      }
      item.id = parseInt(ItemId, 10);

      // Utiliza o mapper para criar o DTO de atualização
      const itemDTO = ItemMapper.mapItemToUpdateDTO(item);
      const updatedItem = await itemService.update(itemDTO);
      if (!updatedItem) {
        res.status(404).json({ error: "Item not found or error updating item" });
        return;
      }
      res.status(200).json(updatedItem);
    } catch {
      res.status(500).json({ error: "Error updating item" });
    }
  }

  // Deleta um item pelo ID
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const deletedItem = await itemService.delete(id);
      if (!deletedItem) {
        res.status(404).json({ error: "Item not found or error deleting item" });
        return;
      }
      res.status(200).json(deletedItem);
    } catch {
      res.status(500).json({ error: "Error deleting item" });
    }
  }
}