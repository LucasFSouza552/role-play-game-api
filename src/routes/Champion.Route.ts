import { Router } from "express";
import { ChampionController } from "../controllers/ChampionController";

const championController = new ChampionController();
const ChampionRoute = Router();

/**
 * @swagger
 * /api/champions:
 *   get:
 *     summary: Listar todos os campeões
 *     description: Retorna uma lista de todos os campeões do usuário
 *     tags:
 *       - Campeões (Champions)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de campeões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Champion'
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
ChampionRoute.get("/", championController.getAll);

/**
 * @swagger
 * /api/champions/{id}:
 *   get:
 *     summary: Recuperar um campeão específico do usuário
 *     description: Retorna um campeão do usuário baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do campeão
 *         content:
 *           application/json:
 *             schema:
 *               type: 
*                  object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 name:
 *                   type: string
 *                   description: Nome do campeão
 *                 roleId:
 *                   type: integer
 *                   description: Função ou classe do campeão
 *                 guildId:
 *                   type: integer
 *                   nullable: true
 *                   description: Identificador da guilda à qual o campeão pertence (pode ser nulo)
 *                 money:
 *                   type: number
 *                   format: float
 *                   description: Quantidade de dinheiro do campeão
 *                 strength:
 *                   type: integer
 *                   description: Atributo de força física do campeão
 *                 dexterity:
 *                   type: integer   
 *                   description: Atributo de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Atributo de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Atributo de resistência e vida máxima do campeão
 *                 hp:
 *                   type: integer
 *                   description: Pontos de vida atuais do campeão
 *                 level:
 *                   type: integer
 *                   description: Nível atual do campeão
 *                 xp:
 *                   type: integer
 *                   description: Experiência acumulada pelo campeão
 *                 xp_max:
 *                   type: integer
 *                   description: Experiência necessária para o próximo nível
 *                 sp:
 *                   type: integer
 *                   description: Pontos de habilidade disponíveis para distribuição
 *                 skills:
 *                    type: array
 *                    items:
 *                       $ref: '#/components/schemas/Skill'
 *                       description: Habilidade do campeão
 *                    description: Lista de habilidades do campeão
 *                 role:
 *                    type: object
 *                    $ref: '#/components/schemas/Role'
 *                    description: Função ou classe do campeão

 *       404:
 *         description: Campeão não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
ChampionRoute.get("/:id", championController.getById);

/**
 * @swagger
 * /api/champions/{id}/skills:
 *   get:
 *     summary: Recuperar todas as habilidades de um campeão
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de habilidades do campeão
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 */
ChampionRoute.get('/:id/skills', championController.getSkills);

/**
 * @swagger
 * /api/champions:
 *   post:
 *     summary: Criar um novo campeão
 *     description: Cria um novo campeão com as informações fornecidas.
 *     tags:
 *       - Campeões (Champions)
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
 *               roleId:
 *                 type: integer
 *                 description: Identificador único da classe do campeão.
 *                 default: 1
 *                 minimum: 1
 * 
 * 
 *     responses:
 *       201:
 *         description: Campeão criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único do campeão
 *                 name:
 *                   type: string
 *                   description: Nome do campeão
 *                 roleId:
 *                   type: integer
 *                   description: Função ou classe do campeão
 *                 guildId:
 *                   type: integer
 *                   nullable: true
 *                   description: Identificador da guilda à qual o campeão pertence (pode ser nulo)
 *                 money:
 *                   type: number
 *                   format: float
 *                   description: Quantidade de dinheiro do campeão
 *                 strength:
 *                   type: integer
 *                   description: Atributo de força física do campeão
 *                 dexterity:
 *                   type: integer   
 *                   description: Atributo de agilidade e precisão do campeão
 *                 intelligence:
 *                   type: integer
 *                   description: Atributo de inteligência e magia do campeão
 *                 vitality:
 *                   type: integer
 *                   description: Atributo de resistência e vida máxima do campeão
 *                 hp:
 *                   type: integer
 *                   description: Pontos de vida atuais do campeão
 *                 level:
 *                   type: integer
 *                   description: Nível atual do campeão
 *                 xp:
 *                   type: integer
 *                   description: Experiência acumulada pelo campeão
 *                 xp_max:
 *                   type: integer
 *                   description: Experiência necessária para o próximo nível
 *                 sp:
 *                   type: integer
 *                   description: Pontos de habilidade disponíveis para distribuição
 *                 skills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 *                   description: Lista de habilidades do campeão
 *                 role:
 *                   type: object
 *                   $ref: '#/components/schemas/Role'
 *                   description: Função ou classe do campeão
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
 *       500:
 *         description: Erro interno do servidor.
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
 *     description: Remove um campeão baseado no ID fornecido.
 *     tags:
 *       - Campeões (Champions)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único do campeão
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Campeão excluído com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.delete("/:id", championController.delete);

/**
 * @swagger
 * /api/champions/{id}/skill:
 *   post:
 *     summary: Adicionar habilidades ao campeão
 *     description: Adiciona novas habilidades ao campeão especificado pelo ID. O usuário só pode adicionar habilidades aos seus próprios campeões.
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
 *                   description: Descrição do erro.
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
 *         description: Campeão não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
ChampionRoute.patch("/:id/skill", championController.addSkill);


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