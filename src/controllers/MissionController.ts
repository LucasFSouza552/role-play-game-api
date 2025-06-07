import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Mission } from "../models/Mission";
import { MissionsService } from "../services/MissionsService";
import { Request, Response } from "express";
import { MissionMapper } from "../utils/mapppers/missionMapping";

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
                res.status(400).send({ error: "Invalid ID." });
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
                res.status(400).json({ error: 'Missing required information to create a mission' });
                return;
            }

            if(!mission.SP && !mission.XP && !mission.money) {
                res.status(400).json({ error: 'The mission needs rewards' });
                return;
            }
            
            const missionData: createMissionDTO = MissionMapper.mapCreateMissionToDTO(mission)

            const newMission = await missionsServices.create(missionData);
            res.status(201).json({ newMission });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const missionId = parseInt(req.params.id);
            const mission: updateMissionDTO = req.body;

            if (!missionId) {
                res.status(400).json({ error: 'Invalid mission ID' });
            }

            const missionExists: Mission = await missionsServices.getById(missionId);

            if (!missionExists) {
                res.status(400).json({ error: 'Mission not found' });
                return;
            }
        
            const missionData: updateMissionDTO = MissionMapper.mapUpdateMissionToDTO(mission);

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
                res.status(400).json({ error: 'Invalid user.' });
                return;
            }

            if (!missionId) {
                res.status(400).json({ error: 'Invalid mission ID.' });
                return;
            }

            const deletedMission = await missionsServices.delete(userId, missionId);
            res.status(200).json({ deletedMission: !!deletedMission });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    
}