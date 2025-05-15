import { Router } from "express";

import ChampionRoute from "./ChampionRoute.Route"
import MissionsRoute from "./MissionsRoute.Route";
import ChampionRoleRoute from "./ChampionRoleRoute.Route";
import userRoute from "./userRoute.Route";

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