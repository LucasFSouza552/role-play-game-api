import { Router } from "express";

import ChampionRoute from "./Champion.Route"
import MissionsRoute from "./Missions.Route";
import ChampionRoleRoute from "./ChampionRole.Route";
import userRoute from "./user.Route";

import AuthMiddleware from "../middleware/authMiddleware";

const apiRoute = Router();

apiRoute.get("/", (req, res) => {
    res.send("API");
})

apiRoute.use("/users", userRoute);
apiRoute.use("/champions", AuthMiddleware, ChampionRoute);
apiRoute.use("/roles", ChampionRoleRoute);
apiRoute.use("/missions", AuthMiddleware, MissionsRoute);

export default apiRoute;