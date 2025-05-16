import { MissionsService } from "../services/MissionsService";
import { Request, Response } from "express";

const missionsServices = new MissionsService();

export class MissionsController {
    async getAll(req: Request, res: Response) {
        try {
            const missions = await missionsServices.getAllMissions();
            res.status(200).json({
                missions: missions,
                length: missions.length
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const missionsId = parseInt(req.params.id);

            if (!missionsId) {
                res.status(400).send({ error: "ID inválido." })
                return;
            }
            const mission = await missionsServices.getMissionById(missionsId);
            res.status(200).json(mission);
        } catch (err: any) {
            res.status(500).json({ err: err.message });;
        }
    }

    async createMission(req: Request, res: Response) {
        try {
            const mission = req.body;
            const newMission = await missionsServices.createMission(mission);
            res.status(201).json({ newMission });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateMission(req: Request, res: Response) {
        try {
            const missionId = parseInt(req.params.id);
            const mission = req.body;

            if (missionId < 0) {
                res.status(400).json({ error: 'ID inválido para missão' });
            }

            const missionExists = await missionsServices.getMissionById(missionId);

            if (!missionExists) {
                res.status(400).json({ error: 'Missão não encontrada' });
                return;
            }

            const updatedMission = await missionsServices.updateMission(missionId, mission);
            res.status(200).json(updatedMission);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteMission(req: Request, res: Response) {
        try {
            const missionId = parseInt(req.params.id);

            if (!missionId) {
                res.status(400).json({ error: 'ID inválido para missões.' });
                return;
            }

            const deletedMission = await missionsServices.deleteMission(missionId);
            res.status(200).json({ deletedMission: !!deletedMission });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}