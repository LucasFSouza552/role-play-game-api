import { Router } from "express";

import ChampionRoute from "./ChampionRoute.Route"
import ChampionRoleRoute from "./ChampionRoleRoute.Route";

const apiRoute = Router();

apiRoute.get("/", (req, res) => {
    res.send("API");
})

apiRoute.use("/champions", ChampionRoute);
apiRoute.use("/roles", ChampionRoleRoute);

export default apiRoute;