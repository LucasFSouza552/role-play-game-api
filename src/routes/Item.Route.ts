import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const itemController = new ItemController();
const ItemRoute = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - type
 *         - priceMin
 *         - priceMax
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do item
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do item
 *           example: "Espada Longa"
 *         description:
 *           type: string
 *           description: Descrição detalhada do item
 *           example: "Uma espada longa forjada em aço valiriano"
 *         type:
 *           type: string
 *           description: Tipo do item
 *           enum: [Spells, Armour, Weapons, Potions]
 *           example: "Weapons"
 *         priceMin:
 *           type: number
 *           format: float
 *           description: Preço mínimo do item
 *           example: 50.00
 *         priceMax:
 *           type: number
 *           format: float
 *           description: Preço máximo do item
 *           example: 150.00
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Listar todos os itens (Apenas Administradores)
 *     description: Retorna uma lista de todos os itens disponíveis no jogo, com opções de filtro. Acesso restrito a administradores.
 *     tags:
 *        - Itens (Items)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filtrar por tipo de item
 *         schema:
 *           type: string
 *           enum: [Spells, Armour, Weapons, Potions]
 *           example: "Weapons"
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filtrar por nome do item
 *         schema:
 *           type: string
 *           example: "Espada"
 *       - in: query
 *         name: minPrice
 *         required: false
 *         description: Preço mínimo do item
 *         schema:
 *           type: number
 *           example: 50
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         description: Preço máximo do item
 *         schema:
 *           type: number
 *           example: 200
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
 *           enum: [id, name, type, priceMin, priceMax]
 *           default: "id"
 *           example: "name"
 *       - in: query
 *         name: order
 *         required: false
 *         description: Direção da ordenação
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "asc"
 *           example: "asc"
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *                 total:
 *                   type: integer
 *                   description: Número total de itens
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   description: Página atual
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                   example: 10
 *                 hasNext:
 *                   type: boolean
 *                   description: Indica se existe próxima página
 *                   example: true
 *                 hasPrevious:
 *                   type: boolean
 *                   description: Indica se existe página anterior
 *                   example: false
 *             example:
 *               items:
 *                 - id: 1
 *                   name: "Espada Longa"
 *                   description: "Uma espada longa forjada em aço valiriano"
 *                   type: "Weapons"
 *                   priceMin: 50.00
 *                   priceMax: 150.00
 *                 - id: 2
 *                   name: "Armadura de Couro"
 *                   description: "Armadura leve feita de couro resistente"
 *                   type: "Armour"
 *                   priceMin: 30.00
 *                   priceMax: 100.00
 *               total: 100
 *               page: 1
 *               totalPages: 10
 *               hasNext: true
 *               hasPrevious: false
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
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
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
 *                   description: Mensagem de erro
 *                   example: "Internal server error"
 */
ItemRoute.get("/", itemController.getAll);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Obter item por ID (Apenas Administradores)
 *     description: Retorna os detalhes de um item específico pelo seu ID. Acesso restrito a administradores.
 *     tags:
 *        - Itens (Items)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *             example:
 *               id: 1
 *               name: "Espada Longa"
 *               description: "Uma espada longa forjada em aço valiriano"
 *               type: "Weapons"
 *               priceMin: 50.00
 *               priceMax: 150.00
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
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Item not found"
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
ItemRoute.get("/:id", AuthMiddleware, itemController.getById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Criar novo item (Apenas Administradores)
 *     description: Cria um novo item no jogo. Acesso restrito a administradores.
 *     tags:
 *        - Itens (Items)
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
 *               - type
 *               - priceMin
 *               - priceMax
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do item
 *                 example: "Espada Longa"
 *               description:
 *                 type: string
 *                 description: Descrição do item
 *                 example: "Uma espada longa forjada em aço valiriano"
 *               type:
 *                 type: string
 *                 description: Tipo do item
 *                 enum: [Spells, Armour, Weapons, Potions]
 *                 example: "Weapons"
 *               priceMin:
 *                 type: number
 *                 description: Preço mínimo do item
 *                 minimum: 0
 *                 example: 50.00
 *               priceMax:
 *                 type: number
 *                 description: Preço máximo do item
 *                 minimum: 0
 *                 example: 150.00
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
 *                   example: "Access denied: only administrators can create items"
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
ItemRoute.post("/", itemController.create);

/**
 * @swagger
 * /api/items/{id}:
 *   patch:
 *     summary: Atualizar item (Apenas Administradores)
 *     description: Atualiza os dados de um item existente. Acesso restrito a administradores.
 *     tags:
 *       - Itens (Items)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do item
 *                 example: "Espada Longa Melhorada"
 *               description:
 *                 type: string
 *                 description: Nova descrição do item
 *                 example: "Uma espada longa forjada em aço valiriano melhorada"
 *               type:
 *                 type: string
 *                 description: Novo tipo do item
 *                 enum: [Spells, Armour, Weapons, Potions]
 *                 example: "Weapons"
 *               priceMin:
 *                 type: number
 *                 description: Novo preço mínimo do item
 *                 minimum: 0
 *                 example: 75.00
 *               priceMax:
 *                 type: number
 *                 description: Novo preço máximo do item
 *                 minimum: 0
 *                 example: 200.00
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
 *                   example: "Access denied: only administrators can update items"
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Item not found"
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
ItemRoute.patch("/:id", AuthMiddleware, authorizationMiddleware(["admin"]), itemController.update);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Excluir item (Apenas Administradores)
 *     description: Remove um item do jogo. Acesso restrito a administradores.
 *     tags:
 *        - Itens (Items)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do item
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Item excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Item excluído com sucesso"
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
 *                   example: "Access denied: only administrators can delete items"
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Item not found"
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
ItemRoute.delete("/:id", AuthMiddleware, authorizationMiddleware(["admin"]), itemController.delete);

export default ItemRoute;