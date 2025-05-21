import { Router } from "express";

import ChampionRoute from "./ChampionRoute.Route"
import ChampionRoleRoute from "./ChampionRoleRoute.Route";
import ItemRoute from "./ItemRoute.Route";

const apiRoute = Router();

apiRoute.get("/", (req, res) => {
    res.send("API");
})

apiRoute.use("/champions", ChampionRoute);
apiRoute.use("/roles", ChampionRoleRoute);
apiRoute.use("/itens", ItemRoute);

export default apiRoute;