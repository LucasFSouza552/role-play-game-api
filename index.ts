import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerDocs from "./src/config/swagger";
import swaggerUi from 'swagger-ui-express';
import apiRoute from "./src/routes/Api.Route";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || "5000";

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(express.static("public")); 
app.use('/api', apiRoute);

app.listen(PORT, () => {
	console.log(`API rodando na porta http://localhost:${PORT}\nVeja a documentação em http://localhost:${PORT}/docs`);
});