const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RPG API",
      version: "1.0.0",
      description: "Documentação da API para o RPG",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Insira seu token JWT no formato: Bearer <token>",
        },
      },
      schemas: {
        Skill: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da habilidade",
            },
            name: {
              type: "string",
              description: "Nome da habilidade",
            },
            description: {
              type: "string",
              description: "Descrição da habilidade",
            },
            power: {
              type: "integer",
              description: "Poder da habilidade",
            },
            cost: {
              type: "integer",
              description: "Custo da habilidade",
            },
            target: {
              type: "string",
              description: "Alvo da habilidade",
            },
          },
        },
        Role:{
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID da classe",
            },
            name: {
              type: "string",
              description: "Nome da classe",
            },
            description: {
              type: "string",
              description: "Descrição da classe",
            },
            hp: {
              type: "integer",
              description: "Pontos de vida da classe",
            },
            mp: {
              type: "integer",
              description: "Pontos de mana da classe",
            },
            ep: {
              type: "integer",
              description: "Pontos de energia da classe",
            },
          },
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Usuários (Users)",
        description: "Operações de usuários",
      },
      {
        name: "Campeões (Champions)",
        description: "Operações de personagens",
      },
      {
        name: "Itens (Items)",
        description: "Operações de itens",
      },
      {
        name: "Missões (Missions)",
        description: "Operações de missões",
      },
      {
        name: "Classes (Roles)",
        description: "Operações de classes",
      },
      {
        name: "Habilidades (Skills)",
        description: "Operações de habilidades",
      },
      {
        name: "Guildas (Guilds)",
        description: "Operações de guildas",
      },
    ],
  },
  apis: ["./src/routes/*.Route.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
