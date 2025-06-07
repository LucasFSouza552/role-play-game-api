import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerDocs from "./src/config/swagger";
import swaggerUi from 'swagger-ui-express';
import apiRoute from "./src/routes/Api.Route";
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || "3000";

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuração de arquivos estáticos
app.use('/js', express.static(path.join(__dirname, 'public', 'js'), {
	setHeaders: (res, filePath) => {
		if (filePath.endsWith('.js')) {
			res.setHeader('Content-Type', 'application/javascript');
		}
	}
}));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão para o index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', apiRoute);

app.listen(PORT, () => {
	console.log(`API rodando na porta http://localhost:${PORT}\nVeja a documentação em http://localhost:${PORT}/docs`);
});
