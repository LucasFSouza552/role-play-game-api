import { Request, Response } from "express";
import { FilterChampionRole, FilterDefault } from "../models/Filters";
import { ChampionRoleService } from "../services/ChampionRoleService";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionRole } from "../models/ChampionRole";

const championRoleService = new ChampionRoleService();

export class ChampionRoleController implements ControllerInterface {

    async update(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id && !isNaN(Number(req.params.id)) ? parseInt(req.params.id) : null;

            if (!roleId) {
                res.status(400).send({ error: "Invalid ID" })
                return;
            }

            const role = req.body;
            const requiredFields = ['name', 'description', 'hp', 'mp', 'ep'];
            const missingFields = requiredFields.filter(field => !role[field]);

            if (missingFields.length > 0) {
                res.status(400).send({ 
                    error: "Missing required fields", 
                    missingFields: missingFields 
                });
                return;
            }

            const updatedRole = await championRoleService.update(role);
            res.status(200).json(updatedRole);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id && !isNaN(Number(req.params.id)) ? parseInt(req.params.id) : null;

            if (!roleId) {
                res.status(400).send({ error: "Invalid ID" })
                return;
            }

            const deletedRole = await championRoleService.delete(roleId);

            if (!deletedRole) {
                res.status(404).send({ error: "Role not found" });
                return;
            }

            res.status(200).json({ message: "Role deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const filters: FilterChampionRole = { ...FilterDefault, ...req.query };
            const roles: ChampionRole[] = await championRoleService.getAll(filters);

            res.status(200).json({ roles: roles, length: roles.length });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id ? parseInt(req.params.id) : null;

            if (!roleId) {
                res.status(400).send({ error: "Invalid ID" })
                return;
            }
            
            const role = await championRoleService.getById(roleId);
            if(!role) {
                res.status(404).send({ error: "Role not found" });
                return;
            }
            res.status(200).json(role);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const role = req.body;
            const requiredFields = ['name', 'description', 'hp', 'mp', 'ep'];
            const missingFields = requiredFields.filter(field => !role[field]);

            if (missingFields.length > 0) {
                res.status(400).send({ 
                    error: "Missing required fields", 
                    missingFields: missingFields 
                });
                return;
            }

            // TODO: Criar MAPPER
            const newRole = await championRoleService.create(role);
            res.status(201).json(newRole);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}