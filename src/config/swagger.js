// src/config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pagalo API Example',
      version: '1.0.0',
      description: 'Consumiendo la API de Pagalo en producción'
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
    // Si deseas que por defecto todos los endpoints usen seguridad, puedes agregar:
    // security: [ { bearerAuth: [] } ]
  },
  apis: ['./src/**/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};