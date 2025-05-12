
import { Router } from "express";
import { ChampionRoleController } from "../controllers/ChampionRoleController";

const ChampionRoleRoute = Router();

const championRoleController = new ChampionRoleController();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar classes disponíveis
 *     description: Retorna uma lista das classes
 *     tags:
 *       - Classes (Roles)
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nome da classe para filtrar
 *         schema:
 *           type: string
 *           example: "mage"
 *       - in: query
 *         name: size
 *         required: false
 *         description: Número de itens por página.
 *         schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Número de itens a pular para paginação.
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *     responses:
 *       200:
 *         description: Lista de papeis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoleRoute.get("/", championRoleController.getAll);


export default ChampionRoleRoute;