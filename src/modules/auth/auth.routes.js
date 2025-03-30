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
 *     description: Envía email y password a la API remota de Pagalo y retorna el token obtenido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: devapolo@apolo.gt
 *               password:
 *                 type: string
 *                 example: "0rQcy9Z2"
 *     responses:
 *       200:
 *         description: Respuesta exitosa con token y datos del negocio
 *       400:
 *         description: Faltan credenciales
 *       500:
 *         description: Error interno
 */
router.post('/login', loginToPagalo);

module.exports = router;