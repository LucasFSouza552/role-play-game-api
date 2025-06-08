import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const itemController = new ItemController();
const ItemRoute = Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Listar todos os itens
 *     description: Retorna uma lista de todos os itens disponíveis no jogo, com opções de filtro e paginação
 *     tags:
 *       - Itens (Items)
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
 *       - in: query
 *         name: minPrice
 *         required: false
 *         description: Preço mínimo do item
 *         schema:
 *           type: number
 *           example: 0
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
 *         description: Lista de itens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Item"
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
 *         description: Itens não encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Items not found"
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
ItemRoute.get("/", itemController.getAll);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Obter item por ID
 *     description: Retorna os detalhes de um item específico pelo seu ID
 *     tags:
 *       - Itens (Items)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Item"
 *             example:
 *               id: 1
 *               name: "Espada Longa"
 *               description: "Uma espada longa forjada em aço valiriano"
 *               type: "Weapons"
 *               priceMin: 50.00
 *               priceMax: 150.00
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
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *                   example: "Internal server error"
 */
ItemRoute.get("/:id",itemController.getById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Criar novo item
 *     description: Cria um novo item no sistema
 *     tags:
 *       - Itens (Items)
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
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do item
 *               type:
 *                 type: string
 *                 enum: [Spells, Armour, Weapons, Potions]
 *                 description: Tipo do item
 *               priceMin:
 *                 type: number
 *                 minimum: 0
 *                 description: Preço mínimo do item
 *               priceMax:
 *                 type: number
 *                 minimum: 0
 *                 description: Preço máximo do item
 *             example:
 *               name: "Espada Longa"
 *               description: "Uma espada longa forjada em aço valiriano"
 *               type: "Weapons"
 *               priceMin: 50.00
 *               priceMax: 150.00
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Item"
 *             example:
 *               id: 1
 *               name: "Espada Longa"
 *               description: "Uma espada longa forjada em aço valiriano"
 *               type: "Weapons"
 *               priceMin: 50.00
 *               priceMax: 150.00
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
 *       404:
 *         description: Erro ao criar item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not created"
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
ItemRoute.post("/", itemController.create);

/**
 * @swagger
 * /api/items/{id}:
 *   patch:
 *     summary: Atualizar item
 *     description: Atualiza um item existente no sistema
 *     tags:
 *       - Itens (Items)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do item a ser atualizado
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
 *               description:
 *                 type: string
 *                 description: Nova descrição do item
 *               type:
 *                 type: string
 *                 enum: [Spells, Armour, Weapons, Potions]
 *                 description: Novo tipo do item
 *               priceMin:
 *                 type: number
 *                 minimum: 0
 *                 description: Novo preço mínimo do item
 *               priceMax:
 *                 type: number
 *                 minimum: 0
 *                 description: Novo preço máximo do item
 *             example:
 *               name: "Espada Longa - Atualizada"
 *               description: "Uma espada longa forjada em aço valiriano - Atualizada"
 *               type: "Weapons"
 *               priceMin: 75.00
 *               priceMax: 200.00
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Item"
 *             example:
 *               id: 1
 *               name: "Espada Longa - Atualizada"
 *               description: "Uma espada longa forjada em aço valiriano - Atualizada"
 *               type: "Weapons"
 *               priceMin: 75.00
 *               priceMax: 200.00
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The minimum price cannot be greater than the maximum price"
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *                   example: "Internal server error"
 */
ItemRoute.patch("/:id", itemController.update);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Excluir item
 *     description: Remove um item do sistema
 *     tags:
 *       - Itens (Items)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID do item a ser excluído
 *     responses:
 *       200:
 *         description: Item excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedItem:
 *                   type: boolean
 *                   description: Indica se o item foi excluído com sucesso
 *             example:
 *               deletedItem: true
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
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *                   example: "Internal server error"
 */
ItemRoute.delete("/:id", itemController.delete);

export default ItemRoute;