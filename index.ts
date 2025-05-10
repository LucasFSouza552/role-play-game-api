import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ChampionRoute from "./src/routes/ChampionRoute.Route"
dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || "5000";

app.use('/champion', ChampionRoute);

app.listen(PORT, () => {
    console.log(`Servidor Iniciado http://localhost:${PORT}`);
});