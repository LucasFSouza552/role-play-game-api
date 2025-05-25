import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Mission } from "../models/Mission";
import { MissionsService } from "../services/MissionsService";
import { Request, Response } from "express";

const missionsServices = new MissionsService();

export class MissionsController implements ControllerInterface {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const missions: Mission[] = await missionsServices.getAll();
            res.status(200).json({
                missions: missions,
                length: missions.length
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const missionsId: number = parseInt(req.params.id);

            if (!missionsId) {
                res.status(400).send({ error: "ID inválido." });
                return;
            }
            const mission = await missionsServices.getById(missionsId);
            res.status(200).json(mission);
        } catch (err: any) {
            res.status(500).json({ err: err.message });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const mission: createMissionDTO = req.body;

            if (!mission.title || !mission.difficulty || !mission.description) {
                res.status(400).json({ error: 'Falta informação necessária para criar uma missão' });
                return;
            }

            if(!mission.SP && !mission.XP && !mission.money) {
                res.status(400).json({ error: 'A missão precisa de recompensas' });
                return;
            }

            const newMission = await missionsServices.create(mission);
            res.status(201).json({ newMission });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const missionId = parseInt(req.params.id);
            const mission = req.body;

            if (!missionId) {
                res.status(400).json({ error: 'ID inválido para missão' });
            }

            const missionExists: Mission = await missionsServices.getById(missionId);

            if (!missionExists) {
                res.status(400).json({ error: 'Missão não encontrada' });
                return;
            }

            const missionData: updateMissionDTO = {
                id: missionId,
                title: mission.title || missionExists.title,
                difficulty: mission.difficulty || missionExists.difficulty,
                description: mission.description || missionExists.description,
                targetDate: mission.targetDate || missionExists.targetDate
            }

            const updatedMission = await missionsServices.update(missionData);
            res.status(200).json(updatedMission);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const missionId = parseInt(req.params.id);
            const userId = req.userId as number;

            if(!userId) {
                res.status(400).json({ error: 'Usuário inválido.' });
                return;
            }

            if (!missionId) {
                res.status(400).json({ error: 'ID inválido para missões.' });
                return;
            }

            const deletedMission = await missionsServices.delete(userId, missionId);
            res.status(200).json({ deletedMission: !!deletedMission });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    
}