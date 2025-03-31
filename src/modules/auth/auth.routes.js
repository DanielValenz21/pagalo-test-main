// src/modules/auth/auth.routes.js
const { Router } = require('express');
const { loginToPagalo } = require('./auth.controller');

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login contra Pagalo
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Retorna token y datos del negocio
 */
router.post('/login', loginToPagalo);

module.exports = router;