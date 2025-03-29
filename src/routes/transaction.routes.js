const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

/**
 * @swagger
 * /api/transactions/list:
 *   post:
 *     summary: Listado de transacciones
 *     tags:
 *       - Transactions
 *     description: Llama al endpoint remoto de Pagalo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: No autorizado
 */
router.post('/list', transactionController.listTransactions);

/**
 * @swagger
 * /api/transactions/payment:
 *   post:
 *     summary: Obtener pago por UUID
 *     tags:
 *       - Transactions
 *     description: Llama al endpoint remoto de Pagalo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID del pago
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: No autorizado
 */
router.post('/payment', transactionController.getPaymentByUUID);

module.exports = router;