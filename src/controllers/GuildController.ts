import { Request, Response } from 'express';
import { GuildService } from '../services/GuildService';
import { error } from 'console';
import { ControllerInterface } from '../interfaces/controllerInterface';
import { updateGuildDTO } from '../DTOS/GuildDTO';

const guildService = new GuildService();

export class GuildController implements ControllerInterface {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const guilds = await guildService.getAll();
            res.json(guilds);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const guildId = req.params.id;
            res.json(guildId);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const guild = req.body;

            if (!guild.name || !guild.level) {
                res.status(400).json({ error: 'Faltam informações para criar a Guilda' });
                return;
            }

            guild.userId = req.userId as number;

            const newGuild = await guildService.create(guild);

            res.status(201).json(newGuild);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
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

          
			// TODO: Criar MAPPER
          const guildData: updateGuildDTO = {
            id: guildId,
            name: guild.name,
            level: guild.level,
          }
      
          const updatedGuild = await guildService.update(guildData);
          res.status(200).json(updatedGuild);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
      

    async delete(req: Request, res: Response): Promise<void> {
        try {
          const guildId = parseInt(req.params.id);
      
          if (!guildId) {
            res.status(400).json({ error: 'ID inválido.' });
            return;
          }
      
          const deletedGuild = await guildService.delete(guildId);
          res.status(200).json({ deletedGuild: !!deletedGuild });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
      

}