
import { Request, Response } from "express";
import { ChampionService } from "../services/ChampionsService";
import { Filters, defaultFilters } from "../models/Filters";
import { ChampionSkill } from "../models/ChampionSkill";
import { Champion } from "../models/Champion";
import { GuildService } from "../services/GuildService";

const championService = new ChampionService();
const guildService = new GuildService();

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
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;

			if (!championId) {
				res.status(400).send({ error: "ID é inválido" })
				return;
			}

			if(!userId) {
				res.status(400).json({ errror: "Usuário inválido" })
				return;
			}

			const champion = await championService.getChampionById(championId, userId);
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

	async updateStatusChampion(req: Request, res: Response) {
		try {
			const championId = parseInt(req.params.id);
			const userId: number = req.userId as number;
			const { strength, dexterity, intelligence, vitality } = req.body;

			if (!userId) {
				res.status(400).json({ error: "Usuário inválido" })
				return;
			}

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" })
				return;
			}

			if (!strength && !dexterity && !intelligence && !vitality) {
				res.status(400).json({ error: "Falta informação necessária para atualizar o status do campeão" });
				return;
			}

			if (strength < 0 && dexterity < 0 && intelligence < 0 && vitality < 0) {
				res.status(400).json({ error: "O valor do status deve ser maior que zero" });
				return;
			}

			const championExists = await championService.getChampionById(championId, userId);
			if (!championExists) {
				res.status(400).json({ error: "Campeão não encontrado" })
				return;
			}

			const totalSP = strength + dexterity + intelligence + vitality;
			if (totalSP > championExists.sp) {
				res.status(400).json({ error: `O total de SP não pode ser maior que ${championExists.sp} pontos` });
				return;
			}

			const updatedChampion = await championService.updateChampionStatus({
				id: championId,
				userId: userId,
				strength: championExists.strength + (strength || 0),
				dexterity: championExists.dexterity + (dexterity || 0),
				intelligence: championExists.intelligence + (intelligence || 0),
				vitality: championExists.vitality + (vitality || 0),
				sp: championExists.sp - totalSP
			});

			res.status(200).json(updatedChampion);

		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async deleteChampion(req: Request, res: Response) {
		try {
			const championId = parseInt(req.params.id);

			if (!championId) {
				res.status(400).json({ error: "ID do campeão inválido" })
				return;
			}

			const deletedChampion = await championService.deleteChampion(championId);

			res.status(200).json({ deletedChampion: deletedChampion });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	async addSkill(req: Request, res: Response) {
		const championId = parseInt(req.params.id);
		const skillId = req.body.skillId;
		const userId: number = req.userId as number;

		if (!championId) {
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
		const championId = parseInt(req.params.championId);

		if (!championId) {
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

	async joinGuild(req: Request, res: Response) {
		const championId = parseInt(req.params.id);
		const guildId = req.body.guildId && parseInt(req.body.guildId);
		const userId: number = req?.userId as number;

		console.log("userId", userId, "championId", championId, "guildId", req.params.guildId);
		if (!championId || !guildId) {
			res.status(400).json({ error: "Falta informação necessária entrar na guilda" });
			return;
		}

		if(!userId) {
			res.status(400).json({ errror: "Usuário inválido" })
			return;
		}

		const guildExists = await guildService.getGuildById(guildId);

		if (!guildExists) {
			res.status(400).json({ error: "Guilda não encontrada" });
			return;
		}

		const championExists: Champion | null = await championService.getChampionById(championId, userId);
		if (!championExists) {
			res.status(400).json({ errror: "Campião não encontrado" })
			return;
		}

		const hasGuild = championExists.guildId;
		if (hasGuild) {
			res.status(400).json({ error: "O campeão ja pertence a uma guilda" });
			return;
		}

		try {
			const joinedGuild = await championService.updateChampionGuild({
				id: championId,
				guildId: guildId,
				userId: userId
			});
			res.status(200).json(joinedGuild);
		} catch (error) {
			res.status(400).json({ error: "Erro ao entrar na guilda" });
		}

	}



}
