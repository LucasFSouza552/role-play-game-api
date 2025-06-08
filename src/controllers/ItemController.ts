import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { ItemType } from "../models/enums/ItemType";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Item } from "../models/Item";
import { FilterDefault, FilterItem } from "../models/Filters";
import { ItemMapper } from "../utils/mapppers/itemMapping";

const itemService = new ItemService();
export class ItemController implements ControllerInterface {

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filter: FilterItem = { ...FilterDefault, ...req.query };
      const items = await itemService.getAll(filter);
      const itemsDTO = ItemMapper.mapItemToDTOList(items);
      res.status(200).json(itemsDTO);
    } catch (error) {
      res.status(500).json({ error: "Error fetching items" });
    }
  }

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

      const itemDTO = ItemMapper.mapItemToDTO(item);
      res.status(200).json(itemDTO);
    } catch {
      res.status(500).json({ error: "Error fetching item" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const item: Item = req.body;

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

      const validTypes = Object.values(ItemType) as string[];
      if (!validTypes.includes(item.type)) {
        res.status(400).json({ error: "Invalid item type." });
        return;
      }

      if (item.priceMin > item.priceMax) {
        res.status(400).json({ error: "The minimum price cannot be greater than the maximum price." });
        return;
      }

      const itemDTO = ItemMapper.mapCreateItemToDTO(item);
      const newItem = await itemService.create(itemDTO);
      res.status(201).json(newItem);
    } catch {
      res.status(500).json({ error: "Error creating item" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const ItemId = req.params.id;
      const item: Item = req.body;

      if (!ItemId || !item) {
        res.status(400).json({ error: "Invalid item ID or data." });
        return;
      }

      if (item.priceMin != null && item.priceMax != null && item.priceMin > item.priceMax && item.priceMin !== item.priceMax) {
        res.status(400).json({ error: "The minimum price cannot be greater than the maximum price." });
        return;
      }
      const validTypes = Object.values(ItemType) as string[];
      if (item.type && !validTypes.includes(item.type)) {
        res.status(400).json({ error: "Invalid item type." });
        return;
      }
      item.id = parseInt(ItemId, 10);

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