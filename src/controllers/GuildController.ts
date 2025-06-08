import { Request, Response } from 'express';
import { GuildService } from '../services/GuildService';
import { ControllerInterface } from '../interfaces/controllerInterface';
import { updateGuildDTO } from '../DTOS/GuildDTO';
import { FilterGuild } from '../models/Filters';
import { ThrowsError } from '../errors/ThrowsError';
import { GuildMapper } from '../utils/mapppers/guildMapping';
import filterConfig from '../utils/FilterConfig';

const guildService = new GuildService();
export class GuildController implements ControllerInterface {

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterGuild = filterConfig(req.query); 

			const guilds = await guildService.getAll(filter);
			if (!guilds) {
				throw new ThrowsError("Guilds not found", 404);
			}
			res.json({ guilds, total: guilds.length });
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const guildId = parseInt(req.params.id);

			if (!guildId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const guild = await guildService.getById(guildId);
			if (!guild) {
				throw new ThrowsError("Guild not found", 404);
			}
			res.status(200).json(guild);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const guild = req.body;

			if (!guild.name.trim()) {
				throw new ThrowsError("Missing information to create guild", 400);
			}

			const newGuild = await guildService.create(guild);

			res.status(201).json(newGuild);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const guildId = parseInt(req.params.id);

			if (!guildId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const guild = {...req.body, id: guildId};

			if (!guild.name) {
				throw new ThrowsError("Missing information to update guild", 400);
			}

			const guildData: updateGuildDTO = GuildMapper.mapGuildToUpdateDTO(guild);

			const updatedGuild = await guildService.update(guildData);
			res.status(200).json(updatedGuild);
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				console.error(error);
				res.status(500).json({ error: error.message });
			}
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const guildId = parseInt(req.params.id);

			if (!guildId) {
				throw new ThrowsError("Invalid ID", 400);
			}

			const deletedGuild = await guildService.delete(guildId);
			if (!deletedGuild) {
				throw new ThrowsError("Guild not deleted", 404);
			}
			res.status(204).send();
		} catch (error: any) {
			if (error instanceof ThrowsError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}


}
