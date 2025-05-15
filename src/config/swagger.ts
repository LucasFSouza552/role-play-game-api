const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RPG API',
      version: '1.0.0',
      description: 'Documentação da API para o RPG',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira seu token JWT no formato: Bearer <token>'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Champions',
        description: 'Aventureiros'
      }
    ]
  },
  apis: ['./src/routes/*.Route.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
