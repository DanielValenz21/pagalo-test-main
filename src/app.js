// src/app.js
const express = require('express');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const authRoutes = require('./modules/auth/auth.routes');
const transactionRoutes = require('./modules/transaction/transaction.routes');

const app = express();
app.use(express.json());

// Montamos Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de Auth
app.use('/api/auth', authRoutes);

// Rutas de Transacciones
app.use('/api/transactions', transactionRoutes);

module.exports = app;