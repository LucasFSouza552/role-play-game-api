import { Router } from "express";
import { MissionsController } from "../controllers/MissionController";

const missionsController = new MissionsController();
const missionsRoute = Router();

missionsRoute.get("/", missionsController.getAll);
missionsRoute.get("/:id", missionsController.getById);
missionsRoute.post("/", missionsController.createMission);
missionsRoute.patch("/", missionsController.updateMission);

export default missionsRoute;