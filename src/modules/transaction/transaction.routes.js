// src/modules/transaction/transaction.routes.js
const { Router } = require('express');
const { listTransactions, getPaymentByUUID } = require('./transaction.controller');

const router = Router();

/**
 * @swagger
 * /api/transactions/list:
 *   post:
 *     summary: Listado de transacciones en Pagalo
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_uuid:
 *                 type: string
 *                 example: "d4fcaab0-a82b-462b-8a77-098314ac19da"
 *               branch:
 *                 type: string
 *                 example: ""
 *               page:
 *                 type: integer
 *                 example: 1
 *               total_items:
 *                 type: integer
 *                 example: 15
 *               all:
 *                 type: string
 *                 example: ""
 *               date_start:
 *                 type: string
 *                 example: ""
 *               date_end:
 *                 type: string
 *                 example: ""
 *               status_transaction:
 *                 type: string
 *                 example: "ACCEPT"
 *               currency:
 *                 type: string
 *                 example: "GTQ"
 *               filter_column:
 *                 type: object
 *                 properties:
 *                   column:
 *                     type: string
 *                     example: "id"
 *                   value:
 *                     type: string
 *                     example: "DESC"
 *     responses:
 *       200:
 *         description: Respuesta exitosa con el listado de transacciones
 *       401:
 *         description: Falta Bearer token o token inválido
 *       500:
 *         description: Error interno
 */
router.post('/list', listTransactions);

/**
 * @swagger
 * /api/transactions/payment:
 *   post:
 *     summary: Obtener pago por UUID
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 example: "723b0383-4c0b-4d9b-b6e8-80c514ba3b4b"
 *     responses:
 *       200:
 *         description: Detalle del pago
 *       400:
 *         description: Falta UUID
 *       401:
 *         description: Falta Bearer Token
 *       500:
 *         description: Error interno
 */
router.post('/payment', getPaymentByUUID);

module.exports = router;