import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { ChampionSkill } from "../models/ChampionSkill";
import { GuildService } from "../services/GuildService";
import { FilterChampion, FilterDefault } from "../models/Filters";
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

const championService = new ChampionService();
const guildService = new GuildService();
const championInventoryService = new ChampionInventoryService();

export class ChampionController implements ControllerInterface {
	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filters: FilterChampion = {
				...FilterDefault,
				...req.query,
				userId: req.userId
			};
			const champions: ChampionDTO[] = await championService.getAll(filters);

			res.status(200).json({ champions: champions, length: champions.length });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!championId) {
				res.status(400).json({ error: "Invalid champion ID" });
				return;
			}

			const champion: ChampionDTO = await championService.getById(championId, userId);

			if (!champion) {
				res.status(404).json({ error: "Champion not found" });
				return;
			}

			res.status(200).json(champion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const champion: createChampionDTO = req.body;
			const userId: number = req.userId as number;

			if (!champion.name || !champion.roleId) {
				res
					.status(400)
					.json({ error: "Falta informação necessária para criar um campeão" });
				return;
			}

			if (!userId) {
				res.status(400).json({ error: "Invalid User" });
				return;
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
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {

		} catch (error) {

		}
	}

	async updateStatus(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;
			const { strength, dexterity, intelligence, vitality } = req.body;

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" });
				return;
			}

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			if (
				strength == null &&
				dexterity == null &&
				intelligence == null &&
				vitality == null
			) {
				res
					.status(400)
					.json({ error: "Nenhum atributo foi enviado para atualizar" });
				return;
			}

			const status = [strength, dexterity, intelligence, vitality];
			if (status.some((stat) => stat < 0)) {
				res
					.status(400)
					.json({ error: "O valor do status deve ser maior que zero" });
				return;
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				res.status(404).json({ error: "Campeão não encontrado" });
				return;
			}

			const totalSP = status.reduce((acc, stat) => acc + (stat || 0), 0);

			if (totalSP > championExists.sp) {
				res
					.status(400)
					.json({
						error: `O total de SP não pode ser maior que ${championExists.sp} pontos`,
					});
				return;
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
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" });
				return;
			}

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			const deletedChampion = await championService.delete(userId, championId);
			res.status(200).json({ success: deletedChampion });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async addSkill(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const skillId = parseInt(req.body.skillId);
			const userId: number = req.userId as number;

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" });
				return;
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				res.status(404).json({ error: "Campeão não encontrado" });
				return;
			}

			if (!skillId) {
				res.status(400).json({ error: "ID da habilidade inválido" });
				return;
			}

			const hasSkill = championExists.skills?.some(
				(skill: ChampionSkill) => skill.id === skillId
			);
			if (hasSkill) {
				res.status(400).json({ error: "A habilidade já foi adicionada ao campeão" });
				return;
			}

			const addedSkill = await championService.addSkill(championId, skillId);
			res.status(200).json(addedSkill);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async getSkills(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			const championSkills = await championService.getSkills(championId);
			res.status(200).json(championSkills);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async joinGuild(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const guildId = parseInt(req.body.guildId);
			const userId: number = req.userId as number;

			if (!championId || !guildId) {
				res
					.status(400)
					.json({ error: "Falta informação necessária para entrar na guilda" });
				return;
			}

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" });
				return;
			}

			const guildExists = await guildService.getById(guildId);

			if (!guildExists) {
				res.status(404).json({ error: "Guilda não encontrada" });
				return;
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				res.status(404).json({ error: "Campeão não encontrado" });
				return;
			}

			if (championExists.guildId) {
				res.status(400).json({ error: "O campeão já pertence a uma guilda" });
				return;
			}

			const joinedGuild = await championService.updateChampionGuild({
				id: championId,
				guildId: guildId,
				userId: userId,
			});
			res.status(200).json(joinedGuild);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async leaveGuild(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" });
				return;
			}

			const championExists = await championService.getById(championId, userId);
			if (!championExists) {
				res.status(404).json({ error: "Campeão não encontrado" });
				return;
			}

			if (!championExists.guildId) {
				res
					.status(400)
					.json({ error: "O campeão não pertence a nenhuma guilda" });
				return;
			}


			const updatedChampionData: updateChampionDTO = ChampionMapper.mapChampionToUpdateDTO({
				id: championId,
				userId: userId,
				guildId: null,
			})

			const updatedChampion = await championService.updateChampionGuild(updatedChampionData);
			res.status(200).json(updatedChampion);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async getInventory(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			const inventory = await championService.getInventory(championId, userId);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async createInventoryItem(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;
			const { itemId, quantity } = req.body;

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			if (!itemId) {
				res.status(400).json({ error: "ID do item inválido" });
				return;
			}

			if (!quantity || isNaN(quantity) || quantity <= 0) {
				res.status(400).json({ error: "Quantidade inválida" });
				return;
			}

			const inventory = await championService.createInventoryItem(
				championId,
				userId,
				itemId,
				quantity
			);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async updateInventoryItem(req: Request, res: Response): Promise<void> {
		try {
			const championId = parseInt(req.params.id);
			const userId = req.userId as number;
			const { itemId, quantity } = req.body;

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" });
				return;
			}

			if (!itemId) {
				res.status(400).json({ error: "ID do item inválido" });
				return;
			}

			if (!quantity || isNaN(quantity) || quantity < 0) {
				res.status(400).json({ error: "Quantidade inválida" });
				return;
			}

			const inventory = await championService.updateInventoryItem(
				championId,
				userId,
				itemId,
				quantity
			);
			res.status(200).json(inventory);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}
}
