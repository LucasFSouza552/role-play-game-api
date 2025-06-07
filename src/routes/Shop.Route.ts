import { Router } from "express";
import { ShopController } from "../controllers/ShopController";
import AuthMiddleware from "../middleware/authMiddleware";
import authorizationMiddleware from "../middleware/autorizationMiddleware";

const shopRoute = Router();
const shopController = new ShopController();

/**
 * @swagger
 * /api/shop:
 *   get:
 *     summary: Listar todas as lojas
 *     description: Retorna uma lista de lojas com filtros e paginação.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar lojas pelo nome (busca parcial)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrar lojas pelo tipo
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
 *           enum: [id, name, type]
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
 *         description: Lista de lojas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
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
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching shops"
 */
shopRoute.get('/', AuthMiddleware, shopController.getAll);

/**
 * @swagger
 * /api/shop/{id}:
 *   get:
 *     summary: Buscar loja por ID
 *     description: Retorna os dados de uma loja específica.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Loja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
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
 *         description: Loja não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Shop not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching shop"
 */
shopRoute.get('/:id', AuthMiddleware, shopController.getById);

/**
 * @swagger
 * /api/shop:
 *   post:
 *     summary: Criar nova loja
 *     description: Cria uma nova loja no sistema.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating shop"
 */
shopRoute.post('/', AuthMiddleware, authorizationMiddleware(["admin"]), shopController.create);

/**
 * @swagger
 * /api/shop/{id}:
 *   patch:
 *     summary: Atualizar loja
 *     description: Atualiza os dados de uma loja existente.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating shop"
 */
shopRoute.patch('/:id', AuthMiddleware, authorizationMiddleware(["admin"]), shopController.update);

/**
 * @swagger
 * /api/shop/{id}:
 *   delete:
 *     summary: Excluir loja
 *     description: Remove uma loja do sistema.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Loja excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting shop"
 */
shopRoute.delete('/:id', AuthMiddleware, authorizationMiddleware(["admin"]), shopController.delete);

/**
 * @swagger
 * /api/shop/{id}/inventory:
 *   get:
 *     summary: Obter inventário da loja
 *     description: Retorna o inventário de uma loja específica.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Inventário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
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
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching shop inventory"
 */
shopRoute.get('/:id/inventory', AuthMiddleware, shopController.getInventory);

/**
 * @swagger
 * /api/shop/{id}/purchase:
 *   post:
 *     summary: Realizar compra
 *     description: Realiza a compra de itens em uma loja.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - championId
 *               - itemId
 *               - quantity
 *             properties:
 *               championId:
 *                 type: integer
 *                 description: ID do campeão que está realizando a compra
 *               itemId:
 *                 type: integer
 *                 description: ID do item a ser comprado
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 999
 *                 description: Quantidade do item a ser comprado (1-999)
 *     responses:
 *       200:
 *         description: Compra realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Number of items has to be in 1 to 999"
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not enough money"
 */
shopRoute.post('/:id/purchase', AuthMiddleware, shopController.purchase);

/**
 * @swagger
 * /api/shop/{id}/sell:
 *   post:
 *     summary: Realizar venda
 *     description: Realiza a venda de itens para uma loja.
 *     tags:
 *       - Lojas (Shops)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - championId
 *               - itemId
 *               - quantity
 *             properties:
 *               championId:
 *                 type: integer
 *                 description: ID do campeão que está realizando a venda
 *               itemId:
 *                 type: integer
 *                 description: ID do item a ser vendido
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 999
 *                 description: Quantidade do item a ser vendido (1-999)
 *     responses:
 *       200:
 *         description: Venda realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Number of items has to be in 1 to 999"
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not enough items in champion inventory"
 */
shopRoute.post('/:id/sell', AuthMiddleware, shopController.sell);

export default shopRoute;
