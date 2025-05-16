import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { Filters, defaultFilters } from "../models/Filters";
import ValidateUUID from "../utils/validateChampionId";
import { ChampionSkill } from "../models/ChampionSkill";
import { Champion } from "../models/Champion";

const championService = new ChampionService();
export class ChampionController {
	async getAll(req: Request, res: Response) {
		try {
			const filters: Filters = { ...defaultFilters, ...req.query, userId: req.userId };
			const champions = await championService.getAllChampions(filters);

			res.status(200).json({ champions: champions, length: champions.length });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const championId = req.params.id;
			const userId: number = req.userId as number;

			if (!ValidateUUID(championId)) {
				res.status(400).send({ error: "ID é inválido" })
				return;
			}

			if(!userId) {
				res.status(400).json({ errror: "Usuário inválido" })
				return;
			}

			const champion = await championService.getChampionById(championId,userId);
			res.status(200).json(champion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async createChampion(req: Request, res: Response) {
		try {
			const champion = req.body;
			const userId: number = req.userId as number;

			if (!champion.name || !champion.roleName) {
				res.status(400).json({ error: "Falta informação necessária para criar um campeão" });
				return;
			}

			if(!userId) {
				res.status(400).json({ errror: "Usuário inválido" })
				return;
			}

			champion.userId = userId;

			const newChampion = await championService.createChampion(champion);
			res.status(201).json(newChampion);
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
	}

	async updateChampion(req: Request, res: Response) {
		try {
			const championId = req.params.id;
			const champion = req.body;
			const userId: number = req.userId as number;

			if(!userId) {
				res.status(400).json({ errror: "Usuário inválido" })
				return;
			}

			const championExists = await championService.getChampionById(championId, userId);

			if (!championExists) {
				res.status(400).json({ error: "Campeão não encontrado" })
				return;
			}

			const dataChampionUpdate: Omit<Champion, 'id' | 'userId' | 'role' | 'xp_max' > = {
				...championExists,
				...champion
			}

			const { role, skills, ...newChampion } = { ...championExists, ...dataChampionUpdate };

			const updatedChampion = await championService.updateChampion(championId, newChampion);
			res.status(200).json(updatedChampion);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async deleteChampion(req: Request, res: Response) {
		try {
			const championId = req.params.id;

			if (!ValidateUUID(championId)) {
				res.status(400).json({ errror: "ID do campeão inválido" })
				return;
			}

			const deletedChampion = await championService.deleteChampion(championId);
			res.status(200).json({ deletedChampion: !!deletedChampion });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async addSkill(req: Request, res: Response) {
		const championId = req.params.id;
		const skillId = req.body.skillId;
		const userId: number = req.userId as number;

		if (!ValidateUUID(championId)) {
			res.status(400).json({ errror: "ID do campeão inválido" })
			return;
		}

		if(!userId) {
			res.status(400).json({ errror: "Usuário inválido" })
			return;
		}

		const championExists: Champion | null = await championService.getChampionById(championId, userId);
		if (!championExists) {
			res.status(400).json({ errror: "Campião não encontrado" })
			return;
		}

		if (!skillId) {
			res.status(400).json({ error: "Falta informação necessária para criar um campeão" });
			return;
		}


		const hasSkill = championExists.skills?.some((skill: ChampionSkill) => skill.id === skillId);
		if (hasSkill) {
			res.status(400).json({ error: "A habilidade já foi adicionada ao campeão" });
			return;
		}

		try {
			const addedSkill = await championService.addSkill(championId, skillId);
			res.status(200).json(addedSkill);
		} catch (error) {
			res.status(400).json({ error: "Erro ao adicionar habilidade ao campeão" });
		}
	}

	async getSkills(req: Request, res: Response) {
		const championId = req.params.id;

		if (!ValidateUUID(championId)) {
			res.status(400).json({ errror: "ID do campeão inválido" })
			return;
		}

		try {
			const championSkills = await championService.getSkills(championId);
			res.status(200).json(championSkills);
		} catch (error) {
			res.status(400).json({ error: "Erro ao obter habilidades do campeão" });
		}

	}



}
