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
 *           enum: [Spells, Armour, Weapons, Potions]
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
 *               type: object
 *               properties:
 *                 shops:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shop'
 *                 total:
 *                   type: integer
 *                   description: Total de lojas
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
 *         description: Lojas não encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Shops not found"
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
shopRoute.get('/', shopController.getAll);

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
 *         minimum: 1
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
 *                   example: "Internal server error"
 */
shopRoute.get('/:id', shopController.getById);

/**
 * @swagger
 * /api/shop:
 *   post:
 *     summary: Criar nova loja
 *     description: Cria uma nova loja no sistema. Apenas administradores podem criar lojas.
 *     tags:
 *       - Lojas (Shops)
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
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da loja
 *               type:
 *                 type: string
 *                 enum: [Spells, Armour, Weapons, Potions]
 *                 description: Tipo da loja
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user"
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
 *         description: Erro ao criar loja
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating shop"
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
shopRoute.post('/', AuthMiddleware, authorizationMiddleware(["admin"]), shopController.create);

/**
 * @swagger
 * /api/shop/{id}:
 *   patch:
 *     summary: Atualizar loja
 *     description: Atualiza os dados de uma loja existente. Apenas administradores podem atualizar lojas. O tipo da loja não pode ser alterado.
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
 *         description: ID da loja a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome da loja
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You cannot change the type of a shop"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user"
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
 *                   example: "Internal server error"
 */
shopRoute.patch('/:id', AuthMiddleware, authorizationMiddleware(["admin"]), shopController.update);

/**
 * @swagger
 * /api/shop/{id}:
 *   delete:
 *     summary: Excluir loja
 *     description: Remove uma loja do sistema. Apenas administradores podem excluir lojas.
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
 *         description: ID da loja a ser excluída
 *     responses:
 *       204:
 *         description: Loja excluída com sucesso
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
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user"
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
 *         description: Loja não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting shop"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid user"
 *       404:
 *         description: Inventário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Inventory not found"
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
shopRoute.get('/:id/inventory', shopController.getInventory);

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
 *       204:
 *         description: Compra realizada com sucesso
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       404:
 *         description: Recurso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found in shop inventory"
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
 *       204:
 *         description: Venda realizada com sucesso
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid token. Use format Bearer <token>"
 *       404:
 *         description: Recurso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found in champion inventory"
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
shopRoute.post('/:id/sell', AuthMiddleware, shopController.sell);

export default shopRoute;
