import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { ChampionSkill } from "../models/ChampionSkill";
import { GuildService } from "../services/GuildService";
import { FilterChampion } from "../models/Filters";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { 
	ChampionDTO,
	createChampionDTO,
	updateChampionDTO,
	updatedChampionStatusDTO,
} from "../DTOS/ChampionDTO";
import { ChampionInventoryService } from "../services/ChampionInventoryService";
import { InventoryMapper } from "../utils/mapppers/InventoryMapping";
import { ChampionMapper } from "../utils/mapppers/championMapping";
import { createInventoryDTO } from "../DTOS/InventoryDTO";
import filterConfig from "../utils/FilterConfig";

import { ThrowsError } from "../errors/ThrowsError";

const championService = new ChampionService();
const guildService = new GuildService();
const championInventoryService = new ChampionInventoryService();

export class ChampionController implements ControllerInterface {
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filters: FilterChampion = filterConfig({...req.query, userId: req.userId});

			const champions: ChampionDTO[] = await championService.getAll(filters);
			res.status(200).json({ champions, length: champions.length });
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
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!championId) {
				new ThrowsError("Invalid champion ID", 400);
			}

			const champion: ChampionDTO = await championService.getById(championId, userId);

			if (!champion) {
				throw new ThrowsError("Champion not found", 404);
			}

			res.status(200).json(champion);
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
			const champion: createChampionDTO = req.body;
			const userId: number = req.userId as number;

			if (!champion.name.trim() || isNaN(champion.roleId) || champion.roleId <= 0) {
				throw new ThrowsError(
					"Missing required information to create a champion",
					400
				);
			}

			if (!userId) {
				throw new ThrowsError("Invalid User", 400);
			}

			champion.userId = userId;

			const championData: createChampionDTO = ChampionMapper.mapCreateChampionToDTO(champion);

			const newChampion: ChampionDTO = await championService.create(championData);

			const inventoryData: createInventoryDTO = InventoryMapper.mapCreateInventoryToDTO({
				ownerId: newChampion.id,
				capacity: 20,
			});

			await championInventoryService.create(inventoryData);

			res.status(201).json(newChampion);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async update(req: Request, res: Response): Promise<void> { // Atualiza o nome do campeão
		try {
			const championID = parseInt(req.params.id);
			const userId = req.userId as number;

			if (!championID) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			const { name } = req.body;

			if (!name) {
				throw new ThrowsError("Missing required information to update a champion", 400);
			}

			const updatedChampion: updateChampionDTO = ChampionMapper.mapChampionToUpdateDTO({id: championID, userId, name});

			const champion: ChampionDTO = await championService.update(updatedChampion);

			res.status(200).json(champion);

		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async updateStatus(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;
			const { strength, dexterity, intelligence, vitality } = req.body;

			if (!userId) {
				throw new ThrowsError("Invalid user", 400);
			}

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			if (
				strength == null &&
				dexterity == null &&
				intelligence == null &&
				vitality == null
			) {
				throw new ThrowsError("No attributes were sent to update", 400);
			}

			const status = [strength, dexterity, intelligence, vitality];
			if (status.some((stat) => stat < 0)) {
				throw new ThrowsError("The status value must be greater than zero", 400);
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				throw new ThrowsError('Champion not found', 404);
			}

			const totalSP = status.reduce((acc, stat) => acc + (stat || 0), 0);

			if (totalSP > championExists.sp) {
				new ThrowsError(`The total of SP cannot be greater than ${championExists.sp} points`, 400);
			}

			const championData: updatedChampionStatusDTO = ChampionMapper.mapChampionToUpdateStatusDTO({
				id: championId,
				userId: userId,
				strength: championExists.strength + (strength || 0),
				dexterity: championExists.dexterity + (dexterity || 0),
				intelligence: championExists.intelligence + (intelligence || 0),
				vitality: championExists.vitality + (vitality || 0),
				sp: championExists.sp - totalSP
			});

			const updatedChampion = await championService.updateChampionStatus(championData);
			res.status(200).json(updatedChampion);
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
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!userId) {
				throw new ThrowsError("Invalid User", 400);
			}

			if (!championId) {
				throw new ThrowsError("Invalid Champion ID", 400);
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				throw new ThrowsError("Champion not found", 404);
			}

			const deletedChampion = await championService.delete(championId,userId);
			res.status(200).json({ deleted: deletedChampion});
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async addSkill(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const skillId = parseInt(req.body.skillId);
			const userId: number = req.userId as number;

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			if (!userId) {
				throw new ThrowsError("Invalid user", 400);
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				throw new ThrowsError("Champion not found", 404);
			}

			if (!skillId) {
				throw new ThrowsError("Invalid skill ID", 400);
			}

			const hasSkill = championExists.skills?.some(
				(skill: ChampionSkill) => skill.id === skillId
			);
			if (hasSkill) {
				throw new ThrowsError("A skill already exists", 400);
			}

			const addedSkill = await championService.addSkill(championId, skillId);
			res.status(200).json(addedSkill);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async getSkills(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			const championSkills = await championService.getSkills(championId);
			res.status(200).json(championSkills);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async joinGuild(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const guildId = parseInt(req.body.guildId);
			const userId: number = req.userId as number;

			if (!championId || !guildId) {
				throw new ThrowsError("Missing required information to join the guild", 400);
			}

			if (!userId) {
				throw new ThrowsError("Invalid user", 400);
			}

			const guildExists = await guildService.getById(guildId);

			if (!guildExists) {
				throw new ThrowsError("Guild not found", 404);
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				throw new ThrowsError("Champion not found", 404);
			}

			if (championExists.guildId) {
				throw new ThrowsError("The champion already belongs to a guild", 400);
			}

			const joinedGuild = await championService.updateChampionGuild({
				id: championId,
				guildId: guildId,
				userId: userId,
			});
			res.status(200).json(joinedGuild);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async leaveGuild(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!championId) {
				new ThrowsError("Invalid champion ID", 400);
			}

			if (!userId) {
				new ThrowsError("Invalid user", 400);
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				new ThrowsError("Champion not found", 404);
			}

			if (!championExists.guildId) {
				new ThrowsError("The champion does not belong to any guild", 400);
			}

			const updatedChampionData: updateChampionDTO = ChampionMapper.mapChampionToUpdateDTO({
				id: championId,
				userId: userId,
				guildId: null,
			})

			const updatedChampion = await championService.updateChampionGuild(updatedChampionData);
			res.status(200).json(updatedChampion);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async getInventory(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			const inventory = await championService.getInventory(championId, userId);
			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async createInventoryItem(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;
			const { itemId, quantity, price, rarity } = req.body;

			if (!championId) {
				throw new ThrowsError("Invalid champion ID", 400);
			}

			if (!itemId) {
				throw new ThrowsError("Invalid item ID", 400);
			}

			if (!quantity || isNaN(quantity) || quantity <= 0 || quantity > 999) {
				throw new ThrowsError("Invalid quantity", 400);
			}

			const inventory = await championService.createInventoryItem(
				championId,
				userId,
				itemId,
				quantity,
				price,
				rarity || "Common"
			);
			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}

	async updateInventoryItem(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;
			const { itemId, quantity, price } = req.body;

			if (!championId) {
				new ThrowsError("Invalid champion ID", 400);
			}

			if (!itemId) {
				new ThrowsError("Invalid item ID", 400);
			}

			if (price === undefined || price < 0) {
				new ThrowsError("Invalid price", 400);
			}

			if (!quantity || isNaN(quantity) || quantity < 0) {
				new ThrowsError("Invalid quantity", 400);
			}

			const inventory = await championService.updateInventoryItem(
				championId,
				userId,
				itemId,
				quantity,
				price
			);

			res.status(200).json(inventory);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	}
}
