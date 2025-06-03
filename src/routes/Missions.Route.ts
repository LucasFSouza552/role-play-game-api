import { Router } from "express";
import { MissionsController } from "../controllers/MissionController";
import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const missionsController = new MissionsController();
const missionsRoute = Router();

/**
 * @swagger
 * /api/missions:
 *   get:
 *     summary: Listar todas as missões
 *     description: Retorna uma lista de todas as missões disponíveis no jogo
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               missions:
 *                 - id: 1
 *                   name: "Caça ao Dragão"
 *                   description: "Caçar um dragão perigoso que está aterrorizando a vila"
 *                   reward: 1000.00
 *                   difficulty: "Hard"
 *                   status: "Available"
 *               length: 1
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Internal server error"
 */
missionsRoute.get("/", AuthMiddleware, missionsController.getAll);

/**
 * @swagger
 * /api/missions/{id}:
 *   get:
 *     summary: Obter missão por ID
 *     description: Retorna os detalhes de uma missão específica pelo seu ID
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da missão
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes da missão retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *             example:
 *               id: 1
 *               name: "Caça ao Dragão"
 *               description: "Caçar um dragão perigoso que está aterrorizando a vila"
 *               reward: 1000.00
 *               difficulty: "Hard"
 *               status: "Available"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid or expired token"
 *       404:
 *         description: Missão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Mission not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Internal server error"
 */
missionsRoute.get("/:id", AuthMiddleware, missionsController.getById);

/**
 * @swagger
 * /api/missions:
 *   post:
 *     summary: Criar nova missão
 *     description: Cria uma nova missão no jogo. Apenas administradores podem criar missões.
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               id: 1
 *               name: "Caça ao Dragão"
 *               description: "Caçar um dragão perigoso que está aterrorizando a vila"
 *               reward: 1000.00
 *               difficulty: "Hard"
 *               status: "Available"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid data provided"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid or expired token"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Access denied: only administrators can create missions"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Internal server error"
 */
missionsRoute.post("/", AuthMiddleware, authorizationMiddleware(["admin"]), missionsController.create);

/**
 * @swagger
 * /api/missions:
 *   patch:
 *     summary: Atualizar missão
 *     description: Atualiza os dados de uma missão existente. Apenas administradores podem atualizar missões.
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da missão a ser atualizada
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Novo nome da missão
 *                 example: "Caça ao Dragão Melhorada"
 *               description:
 *                 type: string
 *                 description: Nova descrição da missão
 *                 example: "Caçar um dragão perigoso que está aterrorizando a vila - Atualizado"
 *               reward:
 *                 type: number
 *                 format: float
 *                 description: Novo valor da recompensa da missão
 *                 minimum: 0
 *                 example: 1500.00
 *               difficulty:
 *                 type: string
 *                 description: Novo nível de dificuldade da missão
 *                 enum: [Easy, Medium, Hard, Expert]
 *                 example: "Expert"
 *               status:
 *                 type: string
 *                 description: Novo status da missão
 *                 enum: [Available, In Progress, Completed, Failed]
 *                 example: "Available"
 *     responses:
 *       200:
 *         description: Missão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 *             example:
 *               id: 1
 *               name: "Caça ao Dragão Melhorada"
 *               description: "Caçar um dragão perigoso que está aterrorizando a vila - Atualizado"
 *               reward: 1500.00
 *               difficulty: "Expert"
 *               status: "Available"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid data provided"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Invalid or expired token"
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Access denied: only administrators can update missions"
 *       404:
 *         description: Missão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Mission not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Internal server error"
 */
missionsRoute.patch("/", AuthMiddleware, authorizationMiddleware(["admin"]), missionsController.update);

export default missionsRoute;