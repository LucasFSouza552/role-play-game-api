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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nome da classe para filtrar
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página para paginação
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Número de itens por página
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           example: 10
 *       - in: query
 *         name: orderBy
 *         required: false
 *         description: Campo para ordenação
 *         schema:
 *           type: string
 *           enum: [id, name]
 *           default: "id"
 *       - in: query
 *         name: order
 *         required: false
 *         description: Ordem da ordenação
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "asc"
 *     responses:
 *       200:
 *         description: Lista de classes (roles)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *                 length:
 *                   type: integer
 *                   description: Total de classes encontradas
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
 *         description: Nenhuma classe encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Roles not found"
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
ChampionRoleRoute.get("/", championRoleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Recuperar uma classe específica
 *     description: Retorna uma classe baseada no ID fornecido
 *     tags:
 *       - Classes (Roles)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único da classe
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Detalhes atualizados da classe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               id: 2
 *               name: "Guerreiro Elite"
 *               description: "master of magic and arcane arts"
 *               hp: 80
 *               mp: 100
 *               ep: 50
 * 
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
 *         description: Classe não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
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
ChampionRoleRoute.get("/:id", championRoleController.getById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Criar nova classe
 *     description: Cria uma nova classe para campeões
 *     tags:
 *       - Classes (Roles)
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
 *               - description
 *               - hp
 *               - mp
 *               - ep
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da classe
 *                 example: "Guerreiro"
 *               description:
 *                 type: string
 *                 description: Descrição da classe
 *                 example: "Especialista em combate corpo a corpo"
 *               hp:
 *                 type: integer
 *                 description: Pontos de vida base da classe
 *                 example: 100
 *               mp:
 *                 type: integer
 *                 description: Pontos de mana base da classe
 *                 example: 50
 *               ep:
 *                 type: integer
 *                 description: Pontos de energia base da classe
 *                 example: 75
 *     responses:
 *       201:
 *         description: Classe criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Dados inválidos fornecidos ou nome da classe já existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing information to update role or role with this name already exists"
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
ChampionRoleRoute.post("/", championRoleController.create);

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Atualizar classe
 *     description: Atualiza uma classe existente
 *     tags:
 *       - Classes (Roles)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único da classe
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome da classe
 *                 example: "Guerreiro Elite"
 *               description:
 *                 type: string
 *                 description: Nova descrição da classe
 *                 example: "Guerreiro especializado em combate avançado"
 *               hp:
 *                 type: integer
 *                 description: Novos pontos de vida base da classe
 *                 example: 120
 *               mp:
 *                 type: integer
 *                 description: Novos pontos de mana base da classe
 *                 example: 60
 *               ep:
 *                 type: integer
 *                 description: Novos pontos de energia base da classe
 *                 example: 90
 *     responses:
 *       200:
 *         description: Classe atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
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
 *         description: Classe não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
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
ChampionRoleRoute.patch("/:id", championRoleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Excluir classe
 *     description: Remove uma classe existente pelo ID
 *     tags:
 *       - Classes (Roles)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da classe a ser excluída
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       204:
 *         description: Classe excluída com sucesso
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
 *         description: Classe não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
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
ChampionRoleRoute.delete("/:id", championRoleController.delete);

export default ChampionRoleRoute;