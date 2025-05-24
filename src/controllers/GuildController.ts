import { Request, Response } from 'express';
import { GuildService } from '../services/GuildService';
import { guildRepo } from '../repositories/RepositoriosManager';
import ValidateUUID from '../utils/validateChampionId';
import { error } from 'console';

const guildService = new GuildService();

export class GuildController {

    async getAll(req: Request, res: Response) {
        try {
            const guilds = await guildService.getAllGuild();
            res.json(guilds);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const guildId = req.params.id;
            res.json(guildId);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async createGuild(req: Request, res: Response) {
        try {
            const guild = req.body;

            if (!guild.name || !guild.level) {
                return res.status(400).json({ error: 'Faltam informações para criar a Guilda' });
            }

            guild.userId = req.userId as string;

            const newGuild = await guildService.createGuild(guild);

            res.status(201).json(newGuild);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateGuild(req: Request, res: Response) {
        try {
          const guildId = parseInt(req.params.id);
      
          if (!guildId) {
            res.status(400).json({ error: 'ID inválido para Guilda.' });
            return;
          }
      
          const guild = req.body;
      
          if (!guild.name || !guild.level) {
            res.status(400).json({ error: 'Dados incompletos para atualizar a Guilda.' });
            return;
          }
      
          const updatedGuild = await guildService.updateGuild(guildId, guild);
          res.status(200).json(updatedGuild);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
      

    async deleteGuild(req: Request, res: Response) {
        try {
          const guildId = parseInt(req.params.id);
      
          if (!guildId) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
          }
      
          const deletedGuild = await guildService.deleteGuild(guildId);
          res.status(200).json({ deletedGuild: !!deletedGuild });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
      

}