import { Router } from "express";
import { MissionsController } from "../controllers/MissionController";

const missionsController = new MissionsController();
const missionsRoute = Router();

/**
 * @swagger
 * /api/missions:
 *   get:
 *     summary: Retorna todas as missões
 *     tags:
 *       - Missões (Missions)
 *     responses:
 *       200:
 *         description: Lista de missões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 missions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Mission'
 *                 length:
 *                   type: integer
 *                   description: Número de missões retornadas
 */
missionsRoute.get("/", missionsController.getAll);

/**
 * @swagger
 * /api/missions/{id}:
 *   get:
 *     summary: Recupera uma missão pelo ID
 *     tags:
 *       - Missões (Missions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da missão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Missão retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *       404:
 *         description: Missão não encontrada
 */
missionsRoute.get("/:id", missionsController.getById);

/**
 * @swagger
 * /api/missions:
 *   post:
 *     summary: Cria uma nova missão
 *     tags:
 *       - Missões (Missions)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMissionDTO'
 *     responses:
 *       201:
 *         description: Missão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *       400:
 *         description: Erro na cria o da miss o
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descri o do erro.
 */
missionsRoute.post("/", missionsController.create);
missionsRoute.patch("/", missionsController.update);

export default missionsRoute;