// src/config/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pagalo API',
      version: '1.0.0',
      description: 'Documentación de la API para integrar con Pagalo'
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
    // Si quieres forzar que TODOS los endpoints requieran token:
    // security: [ { bearerAuth: [] } ]
  },
  apis: ['./src/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs
};