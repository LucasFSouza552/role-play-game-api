import { Request, Response } from "express";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ShopService } from "../services/ShopService";
import { FilterShop } from "../models/Filters";
import { ThrowsError } from "../errors/ThrowsError";
import { ItemType } from "../models/enums/ItemType";
import filterConfig from "../utils/FilterConfig";

const shopService = new ShopService();

export class ShopController implements ControllerInterface {
	async getInventory(req: Request, res: Response): Promise<void> {
		try {
			const shopId = parseInt(req.params.id);
			if (!shopId) {
				throw new ThrowsError("Invalid ID", 400);
			}
			const inventory = await shopService.getInventory(shopId);
			if(!inventory) {
				throw new ThrowsError("Inventory not found", 404);
			}
			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterShop = filterConfig(req.query);
			const shops = await shopService.getAll(filter);
			if(!shops) {
				throw new ThrowsError("Shops not found", 404);
			}
			res.status(200).json({shops, total: shops.length});
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}
	async getById(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				throw new ThrowsError("Invalid ID", 400);
			}
			const shop = await shopService.getById(id);
			if(!shop) {
				throw new ThrowsError("Shop not found", 404);
			}
			res.status(200).json(shop);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}
	async create(req: Request, res: Response): Promise<void> {
		try {
			const { name, type } = req.body;
			if(!name || !type) {
				throw new ThrowsError("Missing required fields", 400);
			}
			if(!Object.values(ItemType).includes(type as ItemType)) {
				throw new ThrowsError("Invalid type", 400);
			}

			const shop = await shopService.create({ name, type });
			if(!shop) {
				throw new ThrowsError("Error creating shop", 404);
			}
			res.status(201).json(shop);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}
	async update(req: Request, res: Response): Promise<void> {
		try {
			const { id, name, type } = req.body;
			if(!id || !name || !type) {
				throw new ThrowsError("Missing required fields", 400);
			}
			if(!Object.values(ItemType).includes(type as ItemType)) {
				throw new ThrowsError("Invalid type", 400);
			}
			const shop = await shopService.update({ id, name, type });
			if(!shop) {
				throw new ThrowsError("Error updating shop", 404);
			}
			res.status(200).json(shop);
		} catch (error) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}
	async delete(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			if (!id) {
				throw new ThrowsError("Invalid ID", 400);
			}
			const shop = await shopService.delete(id);
			if(!shop) {
				throw new ThrowsError("Error deleting shop", 404);
			}
			res.status(200).json(shop);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async sell(req: Request, res: Response): Promise<void> {
		try {
			const userId = Number(req.userId);
			const shopId = Number(req.params.id);
			const championId = Number(req.body.championId);
			const itemId = Number(req.body.itemId);
			const quantity = Number(req.body.quantity);

			if (!shopId || !userId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			if (!championId || !itemId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			if (!quantity || isNaN(quantity) || quantity < 1 || quantity > 999) {
				throw new ThrowsError("Number of items has to be in 1 to 999", 400);
			}

			const updatedShop = await shopService.sell(
				shopId,
				userId,
				championId,
				itemId,
				quantity
			);

			res.status(200).json(updatedShop);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async purchase(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.userId as Number;
			const shopId = parseInt(req.params.id);

			if (!shopId || !userId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const { championId, itemId, quantity } = req.body;

			if (!championId || !itemId) {
				throw new ThrowsError("Invalid ID", 400);
			}
			if (!quantity || isNaN(quantity) || quantity <= 0 || quantity > 999) {
				throw new ThrowsError("Number of items has to be in 1 to 999", 400);
			}

			const updatedShop = await shopService.purchase(
				shopId,
				Number(userId),
				championId,
				itemId,
				quantity
			);

			res.status(200).json(updatedShop);

		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		} 
	}

}
