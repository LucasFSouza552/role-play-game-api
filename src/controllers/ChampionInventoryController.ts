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
			throw new Error("Error fetching inventories");
		}
	}
	async getById(req: Request, res: Response): Promise<void> {
		const inventoryId = parseInt(req.params.id);

		if (!inventoryId) {
			res.status(400).json({ error: "Invalid ID" });
			return;
		}

		try {
			const inventory = await inventoryService.getById(inventoryId);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(404).json({ error: err.message });
		}
	}
	async create(req: Request, res: Response): Promise<void> {
		try {
			const inventoryData: createInventoryDTO = req.body;

			if (!inventoryData.ownerId) {
				res.status(400).json({ error: "Missing required fields" });
				return;
			}

			const inventory = await inventoryService.create(inventoryData);
			res.status(201).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}
	async update(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);

			if (!id) {
				res.status(400).json({ error: "Invalid ID" });
				return;
			}
			//TODO: Fazer Mapper
			const inventoryData: updateInventoryDTO = req.body;

			if (!inventoryData.capacity) {
				res.status(400).json({ error: "Missing required fields" });
				return;
			}

			const inventory = await inventoryService.update(inventoryData);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
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
				res.status(400).json({ error: "Invalid item" });
				return;
			}

			if (itemPrice === undefined) {
				res.status(400).json({ error: "Invalid item price" });
				return;
			}

			if (!quantity || isNaN(quantity) || quantity <= 0) {
				res.status(400).json({ error: "Invalid quantity" });
				return;
			}

			const inventory = await inventoryService.createItemInventory(inventoryId, itemId, quantity, itemPrice, rarity);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async removeItemInventory(req: Request, res: Response): Promise<void> {
		try {
			const userId: number = req.userId as number;
			const inventoryId = parseInt(req.params.id);
			const item = parseInt(req.body.item);

			if (!item || isNaN(item)) {
				res.status(400).json({ error: "Invalid item or quantity" });
				return;
			}

			const inventoryExists = await inventoryService.getById(inventoryId);
			if (!inventoryExists) {
				res.status(404).json({ error: "Inventory not found" });
				return;
			}

			const updatedInventory = await inventoryService.removeItemInventory(inventoryId, item);
			res.status(200).json(updatedInventory);

		} catch (err: any) {
			res.status(400).json({ error: err?.message || "Unexpected error occurred" });
		}

	}

}
