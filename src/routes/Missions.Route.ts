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
 *     description: Retorna uma lista de missões com filtros e paginação
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrar missões pelo título (busca parcial)
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Easy, Normal, Medium, Hard, Extreme, God]
 *         description: Filtrar missões pela dificuldade
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de itens por página
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, title, difficulty]
 *           default: id
 *         description: Campo para ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Ordem da ordenação
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
 *       404:
 *         description: Missões não encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missions not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
missionsRoute.get("/", missionsController.getAll);

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
 *     description: Cria uma nova missão no sistema. Apenas administradores podem criar missões.
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
 *               - title
 *               - difficulty
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da missão
 *               difficulty:
 *                 type: string
 *                 enum: [Normal, Easy, Medium, Hard, Extreme, God]
 *                 description: Nível de dificuldade da missão
 *               description:
 *                 type: string
 *                 description: Descrição detalhada da missão
 *               SP:
 *                 type: number
 *                 description: Recompensa em pontos de habilidade
 *               XP:
 *                 type: number
 *                 description: Recompensa em pontos de experiência
 *               money:
 *                 type: number
 *                 description: Recompensa em dinheiro
 *             example:
 *               title: "Caça ao Dragão"
 *               difficulty: "Hard"
 *               description: "Caçar um dragão perigoso que está aterrorizando a vila"
 *               SP: 100
 *               XP: 500
 *               money: 1000.00
 *     responses:
 *       201:
 *         description: Missão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newMission:
 *                   $ref: '#/components/schemas/Mission'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required information to create a mission"
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Erro ao criar missão
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mission not created"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
missionsRoute.post("/", AuthMiddleware, authorizationMiddleware(["admin"]), missionsController.create);

/**
 * @swagger
 * /api/missions/{id}:
 *   patch:
 *     summary: Atualizar missão
 *     description: Atualiza uma missão existente no sistema. Apenas administradores podem atualizar missões.
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da missão a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Novo título da missão
 *               difficulty:
 *                 type: string
 *                 enum: [Normal, Easy, Medium, Hard, Extreme, God]
 *                 description: Novo nível de dificuldade da missão
 *               description:
 *                 type: string
 *                 description: Nova descrição da missão
 *               SP:
 *                 type: number
 *                 description: Nova recompensa em pontos de habilidade
 *               XP:
 *                 type: number
 *                 description: Nova recompensa em pontos de experiência
 *               money:
 *                 type: number
 *                 description: Nova recompensa em dinheiro
 *           example:
 *             title: "Caça ao Dragão - Atualizado"
 *             difficulty: "Hard"
 *             description: "Caçar um dragão perigoso que está aterrorizando a vila - Atualizado"
 *             SP: 150
 *             XP: 750
 *             money: 1500.00
 *     responses:
 *       200:
 *         description: Missão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Mission"
 *             example:
 *               id: 1
 *               title: "Caça ao Dragão - Atualizado"
 *               description: "Caçar um dragão perigoso que está aterrorizando a vila - Atualizado"
 *               difficulty: "Hard"
 *               SP: 150
 *               XP: 750
 *               money: 1500.00
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
 *                   example: "Invalid mission ID"
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Missão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *                   example: "Internal server error"
 */
missionsRoute.patch("/:id", AuthMiddleware, authorizationMiddleware(["admin"]), missionsController.update);

/**
 * @swagger
 * /api/missions/{id}:
 *   delete:
 *     summary: Excluir missão
 *     description: Remove uma missão do sistema. Apenas administradores podem excluir missões.
 *     tags:
 *       - Missões (Missions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da missão a ser excluída
 *     responses:
 *       200:
 *         description: Missão excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedMission:
 *                   type: boolean
 *                   description: Indica se a missão foi excluída com sucesso
 *             example:
 *               deletedMission: true
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid mission ID"
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Missão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mission not deleted"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
missionsRoute.delete("/:id", AuthMiddleware, authorizationMiddleware(["admin"]), missionsController.delete);

export default missionsRoute;