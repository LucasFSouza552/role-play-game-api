import { Router } from "express";
import { GuildController } from "../controllers/GuildController";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const guildController = new GuildController(); 
const GuildRouter = Router();

/**
 * @swagger
 * /api/guilds:
 *   get:
 *     summary: Listar guildas
 *     description: Retorna uma lista de guildas com opções de filtro, paginação e ordenação
 *     tags:
 *       - Guildas (Guilds)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nome da guilda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, level]
 *           default: id
 *         description: Campo para ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Direção da ordenação
 *     responses:
 *       200:
 *         description: Lista de guildas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guilds:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Guild"
 *                 total:
 *                   type: integer
 *                   description: Total de guildas encontradas
 *             example:
 *               guilds:
 *                 - id: 1
 *                   name: "Dragões de Aço"
 *                   level: 10
 *                 - id: 2
 *                   name: "Guerreiros da Luz"
 *                   level: 8
 *               total: 2
 *       400:
 *         description: Parâmetros de filtro inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Limit must be between 0 and 100"
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token not found. Use format Bearer <token>"
 *       403:
 *         description: Sem permissão para acessar o recurso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Nenhuma guilda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Guilds not found"
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
GuildRouter.get("/", guildController.getAll);

/**
 * @swagger
 * /api/guilds/{id}:
 *   get:
 *     summary: Obter guilda por ID
 *     description: Retorna os detalhes de uma guilda específica pelo seu ID
 *     tags:
 *       - Guildas (Guilds)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da guilda
 *     responses:
 *       200:
 *         description: Guilda encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Guild"
 *             example:
 *               id: 1
 *               name: "Dragões de Aço"
 *               description: "Uma guilda poderosa focada em combate"
 *               level: 10
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid ID"
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
 *       404:
 *         description: Guilda não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Guild not found"
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
GuildRouter.get("/:id", guildController.getById);

/**
 * @swagger
 * /api/guilds:
 *   post:
 *     summary: Criar nova guilda
 *     description: Cria uma nova guilda no sistema
 *     tags:
 *       - Guildas (Guilds)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da guilda
 *                 example: "Dragões de Aço"
 *     responses:
 *       201:
 *         description: Guilda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Guild"
 *             example:
 *               name: "Dragões de Aço"
 *               level: 10
 *               created_at: "2025-01-01T00:00:00Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All required fields must be filled"
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
 *       404:
 *         description: Erro ao criar guilda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Guild not created"
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
GuildRouter.post("/", authorizationMiddleware(['admin']),guildController.create);

/**
 * @swagger
 * /api/guilds/{id}:
 *   patch:
 *     summary: Atualizar guilda
 *     description: Atualiza uma guilda existente no sistema
 *     tags:
 *       - Guildas (Guilds)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da guilda a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome da guilda
 *                 example: "Dragões de Aço - Atualizada"
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 description: Novo nível da guilda
 *                 example: 15
 *     responses:
 *       200:
 *         description: Guilda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Guild"
 *             example:
 *               id: 1
 *               name: "Dragões de Aço - Atualizada"
 *               level: 15
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid data"
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
 *       404:
 *         description: Guilda não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Guild not found"
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
GuildRouter.patch("/:id", authorizationMiddleware(['admin']),guildController.update);

/**
 * @swagger
 * /api/guilds/{id}:
 *   delete:
 *     summary: Excluir guilda
 *     description: Exclui uma guilda do sistema
 *     tags:
 *       - Guildas (Guilds)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID da guilda a ser excluida
 *     responses:
 *       204:
 *         description: Guilda excluida com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid data"
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
 *         description: Sem permissão para acessar o recurso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Guilda não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Guild not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
GuildRouter.delete("/:id", authorizationMiddleware(['admin']),guildController.delete);

export default GuildRouter;

