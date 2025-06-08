import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionInventoryService } from "../services/ChampionInventoryService";
import { FilterInventory } from "../models/Filters";
import { createInventoryDTO, updateInventoryDTO } from "../DTOS/InventoryDTO";
import filterConfig from "../utils/FilterConfig";
import { ThrowsError } from "../errors/ThrowsError";

const inventoryService = new ChampionInventoryService();

export class ChampionInventoryController implements ControllerInterface {
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterInventory = filterConfig(req.query);
			const inventories = inventoryService.getAll(filter);
			res.status(200).json(inventories);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
	async getById(req: Request, res: Response): Promise<void> {
		try {
		const inventoryId = parseInt(req.params.id);

			if (!inventoryId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const inventory = await inventoryService.getById(inventoryId);

			if (!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}

			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
	async create(req: Request, res: Response): Promise<void> {
		try {
			const inventoryData: createInventoryDTO = req.body;

			if (!inventoryData.ownerId) {
				throw new ThrowsError("Missing required fields", 400);
			}

			const inventory = await inventoryService.create(inventoryData);
			res.status(201).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
	async update(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);

			if (!id) {
				throw new ThrowsError("Invalid ID", 400);
			}
			const inventoryData: updateInventoryDTO = req.body;

			if (!inventoryData.capacity) {
				throw new ThrowsError("Missing required fields", 400);
			}

			const inventory = await inventoryService.update(inventoryData);
			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const championId = parseInt(req.params.championId);

			if (!id) {
				throw new ThrowsError("Invalid ID", 400);
			}

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			const deletedInventory = await inventoryService.delete(id, championId);
			if (!deletedInventory) {
				throw new ThrowsError("Inventory not deleted", 404);
			}
			res.status(204).send();
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async createItemInventory(req: Request, res: Response): Promise<void> {
		try {
			const inventoryId = parseInt(req.params.id);

			const { itemId , quantity, itemPrice, rarity } = req.body;

			if (!itemId || isNaN(itemId)) {
				throw new ThrowsError("Invalid item", 400);
			}

			if (itemPrice === undefined) {
				throw new ThrowsError("Invalid item price", 400);
			}

			if (!quantity || isNaN(quantity) || quantity <= 0) {
				throw new ThrowsError("Invalid quantity", 400);
			}

			const inventory = await inventoryService.createItemInventory(inventoryId, itemId, quantity, itemPrice, rarity);
			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async removeItemInventory(req: Request, res: Response): Promise<void> {
		try {
			const inventoryId = parseInt(req.params.id);
			const item = parseInt(req.body.item);
			if (!item || isNaN(item)) {
				throw new ThrowsError("Invalid item or quantity", 400);
			}

			const inventoryExists = await inventoryService.getById(inventoryId);
			if (!inventoryExists) {
				throw new ThrowsError("Inventory not found", 404);
			}

			const updatedInventory = await inventoryService.removeItemInventory(inventoryId, item);
			res.status(200).json(updatedInventory);

		}catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}

	}

}
