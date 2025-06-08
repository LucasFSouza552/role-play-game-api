import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Item } from "../models/Item";
import { FilterItem } from "../models/Filters";
import { ItemMapper } from "../utils/mapppers/itemMapping";
import { ThrowsError } from "../errors/ThrowsError";
import filterConfig from "../utils/FilterConfig";

const itemService = new ItemService();
export class ItemController implements ControllerInterface {

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterItem = filterConfig(req.query);
			const items = await itemService.getAll(filter);
			if (!items) {
				throw new ThrowsError("Items not found", 404);
			}
			res.status(200).json({items, total: items.length});
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Error fetching items" });
			}
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const ItemId = parseInt(req.params.id, 10);

			if (!ItemId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const itemExists = await itemService.getById(ItemId);
			if (!itemExists) {
				throw new ThrowsError("Item not found", 404);
			}

			res.status(200).json(itemExists);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Error fetching item" });
			}
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
				throw new ThrowsError("All required fields must be filled.", 400);
			}

			if (item.priceMin > item.priceMax) {
				throw new ThrowsError("The minimum price cannot be greater than the maximum price.", 400);
			}

			const itemDTO = ItemMapper.mapCreateItemToDTO(item);
			const newItem = await itemService.create(itemDTO);
			res.status(201).json(newItem);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Error creating item" });
			}
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const ItemId = req.params.id;
			const item: Item = req.body;

			if (!ItemId || !item) {
				throw new ThrowsError("Invalid item ID or data.", 400);
			}

			if (item.priceMin != null && item.priceMax != null && item.priceMin > item.priceMax && item.priceMin !== item.priceMax) {
				throw new ThrowsError("The minimum price cannot be greater than the maximum price.", 400);
			}

			item.id = parseInt(ItemId, 10);

			const itemDTO = ItemMapper.mapItemToUpdateDTO(item);
			const updatedItem = await itemService.update(itemDTO);
			if (!updatedItem) {
				throw new ThrowsError("Item not found or error updating item", 404);
			}
			res.status(200).json(updatedItem);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Error updating item" });
			}
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const deletedItem = await itemService.delete(id);
			if (!deletedItem) {
				throw new ThrowsError("Item not found or error deleting item", 404);
			}
			res.status(204).send();
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Error deleting item" });
			}
		}
	}
}
