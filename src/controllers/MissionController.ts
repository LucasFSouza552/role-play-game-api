import { createMissionDTO, updateMissionDTO } from "../DTOS/MissionDTO";
import { ControllerInterface } from "../interfaces/controllerInterface";
import { Mission } from "../models/Mission";
import { MissionsService } from "../services/MissionsService";
import { Request, Response } from "express";
import { MissionMapper } from "../utils/mapppers/missionMapping";
import { ThrowsError } from "../errors/ThrowsError";
import { FilterMission } from "../models/Filters";
import filterConfig from "../utils/FilterConfig";

const missionsServices = new MissionsService();

export class MissionsController implements ControllerInterface {

	async getAll(req: Request, res: Response): Promise<void> {
		try {
			const filter: FilterMission = filterConfig(req.query);
			const missions: Mission[] = await missionsServices.getAll(filter);
			res.status(200).json({ missions, length: missions.length });
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			} 
		}
	}

	async getById(req: Request, res: Response): Promise<void> {
		try {
			const missionsId: number = parseInt(req.params.id);

			if (!missionsId) {
				throw new ThrowsError("Invalid ID.", 400);
			}
			const mission = await missionsServices.getById(missionsId);
			if (!mission) {
				throw new ThrowsError("Mission not found", 404);
			}
			res.status(200).json(mission);
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const mission: createMissionDTO = req.body;

			if (!mission.title || !mission.difficulty || !mission.money) {
				throw new ThrowsError('Missing required information to create a mission', 400);
			}

			if(!mission.sp && !mission.xp) {
				throw new ThrowsError('The mission needs rewards', 400);
			}

			if(!mission.description) {
				throw new ThrowsError('The mission needs a description', 400);
			}

			const missionData: createMissionDTO = MissionMapper.mapCreateMissionToDTO(mission)

			const newMission = await missionsServices.create(missionData);
			console.log(newMission);
			res.status(201).json({ newMission });
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const missionId = parseInt(req.params.id);
			if (isNaN(missionId) || missionId <= 0) {
				throw new ThrowsError('Invalid mission ID', 400);
			}

			const mission: updateMissionDTO = req.body;
			if (!mission || typeof mission !== 'object') {
				throw new ThrowsError('Invalid mission data', 400);
			}

			if (mission.money !== undefined && isNaN(mission.money)) {
				throw new ThrowsError('Invalid type for money, expected a number', 400);
			}
			if (mission.sp !== undefined && isNaN(mission.sp)) {
				throw new ThrowsError('Invalid type for sp, expected a number', 400);
			}
			if (mission.xp !== undefined && isNaN(mission.xp)) {
				throw new ThrowsError('Invalid type for xp, expected a number', 400);
			}

			const missionExists: Mission = await missionsServices.getById(missionId);
			if (!missionExists) {
				throw new ThrowsError('Mission not found', 404);
			}

			mission.id = missionId;
			const missionData: updateMissionDTO = MissionMapper.mapUpdateMissionToDTO(mission);

			const updatedMission = await missionsServices.update(missionData);
			res.status(200).json(updatedMission);
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				console.error(err);
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const missionId = parseInt(req.params.id);

			if (!missionId) {
				throw new ThrowsError('Invalid mission ID.', 400);
			}

			const deletedMission = await missionsServices.delete(missionId);
			if (!deletedMission) {
				throw new ThrowsError("Mission not deleted", 404);
			}
			res.status(204).send();
		} catch (err: any) {
			if (err instanceof ThrowsError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				res.status(500).json({ error: "Internal server error" });
			}
		}
	}


}
