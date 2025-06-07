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
 *     responses:
 *       200:
 *         description: Lista de classes (roles)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
ChampionRoleRoute.get("/", championRoleController.getAll);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Recuperar uma classe específica
 *     description: Retorna uma classe baseada no ID fornecido.
 *     tags:
 *       - Classes (Roles)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único da classe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da classe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Class not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Class not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal server error"
 */
ChampionRoleRoute.get("/:id", championRoleController.getById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Criar nova classe
 *     description: Cria uma nova classe para campeões.
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
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Campos obrigatórios faltando"
 *                 missingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["hp", "mp"]
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoleRoute.post("/", championRoleController.create);

/**
 * @swagger
 * /api/roles:
 *   patch:
 *     summary: Atualizar classe
 *     description: Atualiza uma classe existente.
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
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da classe a ser atualizada
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Novo nome da classe
 *                 example: "Guerreiro Elite"
 *               description:
 *                 type: string
 *                 description: Nova descrição da classe
 *                 example: "Guerreiro especializado em combate avançado"
 *     responses:
 *       200:
 *         description: Classe atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Classe não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoleRoute.patch("/", championRoleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Excluir classe
 *     description: Remove uma classe existente pelo ID.
 *     tags:
 *       - Classes (Roles)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da classe a ser excluída
 *         example: 1
 *     responses:
 *       200:
 *         description: Classe excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role deleted successfully
 *       400:
 *         description: Dados inválidos fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Classe não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Role not found
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoleRoute.delete("/:id", championRoleController.delete);

export default ChampionRoleRoute;