// src/app.js
const express = require('express');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const authRoutes = require('./modules/auth/auth.routes');
const transactionRoutes = require('./modules/transaction/transaction.routes');

const app = express();
app.use(express.json());

// Montamos Swagger en /api-docs (opcional si lo quieres documentar)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;