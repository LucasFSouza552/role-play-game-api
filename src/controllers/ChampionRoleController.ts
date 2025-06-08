import { Request, Response } from "express";
import { FilterChampionRole } from "../models/Filters";
import { ChampionRoleService } from "../services/ChampionRoleService";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { ChampionRole } from "../models/ChampionRole";
import filterConfig from "../utils/FilterConfig";
import { ThrowsError } from "../errors/ThrowsError";
import { ChampionRoleMapper } from "../utils/mapppers/championRoleMapping";

const championRoleService = new ChampionRoleService();

export class ChampionRoleController implements ControllerInterface {

    async update(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id && !isNaN(Number(req.params.id)) ? parseInt(req.params.id) : null;

            if (!roleId) {
                throw new ThrowsError("Invalid ID", 400);
            }

            const role = req.body;
            const requiredFields = ['name', 'description', 'hp', 'mp', 'ep'];
            const missingFields = requiredFields.filter(field => !role[field]);

            if (missingFields.length > 0) {
                throw new ThrowsError("Missing required fields: " + missingFields.join(", "), 400);
            }

            const updatedRole = await championRoleService.update(role);
            res.status(200).json(updatedRole);
        } catch (error: any) {
            if (error instanceof ThrowsError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id && !isNaN(Number(req.params.id)) ? parseInt(req.params.id) : null;

            if (!roleId) {
                throw new ThrowsError("Invalid ID", 400);
            }

            const deletedRole = await championRoleService.delete(roleId);

            if (!deletedRole) {
                throw new ThrowsError("Role not found", 404);
            }

            res.status(200).json({ message: "Role deleted successfully" });
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
            const filters: FilterChampionRole = filterConfig(req.query);
            const roles: ChampionRole[] = await championRoleService.getAll(filters);
            res.status(200).json({ roles, length: roles.length });
        } catch (error: any) {
            if (error instanceof ThrowsError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const roleId = req.params.id ? parseInt(req.params.id) : null;

            if (!roleId) {
                throw new ThrowsError("Invalid ID", 400);
            }
            
            const role = await championRoleService.getById(roleId);
            if(!role) {
                throw new ThrowsError("Role not found", 404);
            }
            res.status(200).json(role);
        } catch (error: any) {
            if (error instanceof ThrowsError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const role = req.body;
            const requiredFields = ['name', 'description', 'hp', 'mp', 'ep'];
            const missingFields = requiredFields.filter(field => !role[field]);

            if (missingFields.length > 0) {
                throw new ThrowsError("Missing required fields: " + missingFields.join(", "), 400);
            }

            const roleMapper = ChampionRoleMapper.mapCreateRoleToDTO(role);
            const newRole = await championRoleService.create(roleMapper);

            if (!newRole) {
                throw new ThrowsError("Role not created", 404);
            }

            res.status(201).json(newRole);
        } catch (error: any) {
            if (error instanceof ThrowsError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}