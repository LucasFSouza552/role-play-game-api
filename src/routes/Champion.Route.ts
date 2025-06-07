import { Router } from "express";
import { ChampionController } from "../controllers/ChampionController";

const championController = new ChampionController();
const ChampionRoute = Router();

/**
 * @swagger
 * /api/champions:
 *   get:
 *     summary: Listar todos os campeões do usuário
 *     description: Retorna uma lista paginada de campeões do usuário com possibilidade de filtros
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Limite de itens por página
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nome do campeão
 *       - in: query
 *         name: role
 *         schema:
 *           type: integer
 *         description: Filtro por ID de role do campeão
 *       - in: query
 *         name: level
 *         schema:
 *           type: integer
 *         description: Filtro por nível do campeão
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [name, level, roleId]
 *           default: name
 *         description: Campo para ordenação dos resultados
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Direção da ordenação
 *     responses:
 *       200:
 *         description: Lista de campeões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 champions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Champion'
 *                 length:
 *                   type: integer
 *                   description: Número total de campeões retornados
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid parameters"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *                   example: "Internal server error"
 */
ChampionRoute.get("/", championController.getAll);

/**
 * @swagger
 * /api/champions/{id}:
 *   get:
 *     summary: Recuperar um campeão específico do usuário
 *     description: Retorna um campeão do usuário baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do campeão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Champion'
 *             example:
 *               id: 1
 *               userId: 1
 *               name: "Thorgar"
 *               money: "6189.00"
 *               guildId: null
 *               roleId: 1
 *               strength: 20
 *               dexterity: 15
 *               intelligence: 10
 *               vitality: 25
 *               hp: 0
 *               mp: 0
 *               ep: 0
 *               sp: 15
 *               level: 1
 *               xp: 0
 *               xp_max: 150
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid champion ID"
 *       404:
 *         description: Campeão não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Champion not found"
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
ChampionRoute.get("/:id", championController.getById);

/**
 * @swagger
 * /api/champions/{id}/skills:
 *   post:
 *     summary: Adicionar habilidade ao campeão
 *     description: Adiciona uma nova habilidade ao campeão especificado pelo ID. O usuário só pode adicionar habilidades aos seus próprios campeões.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skillId:
 *                 type: integer
 *                 description: Identificador da habilidade a ser adicionada.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Habilidade adicionada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "A skill already exists"
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
 *         description: Campeão não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Champion not found"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
ChampionRoute.post("/:id/skills", championController.addSkill);

/**
 * @swagger
 * /api/champions:
 *   post:
 *     summary: Criar um novo campeão
 *     description: Cria um novo campeão com as informações fornecidas. O usuário autenticado será automaticamente associado ao campeão criado.
 *     tags:
 *       - Campeões (Champions)
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
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do campeão.
 *                 example: Thorgar
 *               roleId:
 *                 type: integer
 *                 description: ID da classe do campeão (role).
 *                 example: 1
 *     responses:
 *       201:
 *         description: Campeão criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Champion'
 *             example:
 *               id: 1
 *               userId: 1
 *               name: "Thorgar"
 *               money: 0
 *               strength: 0
 *               dexterity: 0
 *               intelligence: 0
 *               vitality: 0
 *               hp: 100
 *               mp: 50
 *               ep: 30
 *               sp: 15
 *               level: 1
 *               xp: 0
 *               xp_max: 150
 *               roleId: 1
 *               guildId: null
 *       400:
 *         description: Erro na requisição (campos obrigatórios ausentes ou inválidos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falta informação necessária para criar um campeão"
 *       401:
 *         description: Usuário não autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid User"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
ChampionRoute.post("/", championController.create);

/**
 * @swagger
 * /api/champions/{id}/status:
 *   patch:
 *     summary: Atualizar o status de um campeão
 *     description: Atualiza o status de um campeão baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               strength:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de força física do campeão
 *               dexterity:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de agilidade e precisão do campeão
 *               intelligence:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de inteligência e magia do campeão
 *               vitality:
 *                 type: integer
 *                 description: Valor a ser adicionado ao atributo de resistência e vida máxima do campeão
 *     responses:
 *       200:
 *         description: Status do campeão atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 strength:
 *                   type: integer
 *                   description: Novo valor de força física do campeão
 *                 dexterity:
 *                   type: integer
 *                   description: Novo valor de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Novo valor de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Novo valor de resistência e vida máxima do campeão
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       404:
 *         description: Campeão não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.patch("/:id/status", championController.updateStatus);

/**
 * @swagger
 * /api/champions/{id}:
 *   delete:
 *     summary: Excluir um campeão
 *     description: Remove um campeão do usuário autenticado baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Campeão excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Requisição inválida (usuário ou ID do campeão inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid User"
 *       401:
 *         description: Usuário não autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid User"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
ChampionRoute.delete("/:id", championController.delete);

/**
 * @swagger
 * /api/champions/{id}/guild/join:
 *   patch:
 *     tags:
 *       - Campeões (Champions)
 *     summary: Entrar na guilda
 *     description: Atualiza o campeão adicionando-o à guilda especificada pelo ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guildId
 *             properties:
 *               guildId:
 *                 type: integer
 *                 description: Identificador da guilda a se juntar.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Campeão entrou na guilda com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Champion'
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *                   example: "Invalid guild ID"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Campeão ou guilda não encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Champion or guild not found"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Internal server error"
 */
ChampionRoute.patch("/:id/guild/join", championController.joinGuild);

/**
 * @swagger
 * /api/champions/{id}/guild/leave:
 *   patch:
 *     tags:
 *       - Campeões (Champions)
 *     summary: Sair da guilda
 *     description: Atualiza o status do campeão removendo-o da guilda atual.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Campeão saiu da guilda com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Champion'
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Champion is not in a guild"
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Campeão não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Champion not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Internal server error"
 */
ChampionRoute.patch("/:id/guild/leave", championController.leaveGuild);

/**
 * @swagger
 * /api/champions/{id}/inventory:
 *   get:
 *     summary: Obter inventário do campeão
 *     description: Retorna todos os itens no inventário do campeão especificado pelo ID. O usuário só pode ver o inventário dos seus próprios campeões.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventário do campeão
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       403:
 *         description: Acesso proibido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "You do not have permission to access this resource"
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.get("/:id/inventory", championController.getInventory);

/**
 * @swagger
 * /api/champions/{id}/inventory:
 *   post:
 *     summary: Atualizar inventário do campeão (Administradores)
 *     description: Atualiza o inventário do campeão adicionando novos itens. Esta operação é restrita a administradores.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: integer
 *                 description: ID do item a ser adicionado
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do item
 *                 minimum: 1
 *                 example: 5
 *     responses:
 *       200:
 *         description: Item adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Invalid quantity"
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.post("/:id/inventory", championController.createInventoryItem);

/**
 * @swagger
 * /api/champions/{id}/inventory:
 *   patch:
 *     summary: Atualizar quantidade de itens no inventário (Administradores)
 *     description: Atualiza a quantidade de itens específicos no inventário do campeão. Esta operação é restrita a administradores.
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: integer
 *                 description: ID do item a ser atualizado
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Nova quantidade do item
 *                 minimum: 0
 *                 example: 10
 *     responses:
 *       200:
 *         description: Quantidade do item atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Invalid quantity"
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.patch("/:id/inventory", championController.updateInventoryItem);

/**
 * @swagger
 * /api/champions/{id}:
 *   patch:
 *     summary: Atualizar o nome de um campeão
 *     description: Atualiza o nome de um campeão específico.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
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
 *                 description: Novo nome do campeão
 *                 example: "Novo Nome do Campeão"
 *     responses:
 *       200:
 *         description: Nome do campeão atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Champion'
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *                   example: "Invalid name"
 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.patch("/:id", championController.update);

export default ChampionRoute;