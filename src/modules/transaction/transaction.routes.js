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
 *     description: Llama a la API remota con Bearer Token en Authorization
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
 *                 description: Identificador único del negocio
 *               branch:
 *                 type: string
 *                 description: Sucursal. Vacío para todas
 *               page:
 *                 type: integer
 *                 description: Número de página
 *               total_items:
 *                 type: integer
 *                 description: Elementos por página
 *               all:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 description: YYYY-MM-DD
 *               date_end:
 *                 type: string
 *               status_transaction:
 *                 type: string
 *                 description: "ACCEPT o REJECT"
 *               currency:
 *                 type: string
 *               filter_column:
 *                 type: object
 *                 properties:
 *                   column:
 *                     type: string
 *                   value:
 *                     type: string
 *             example:
 *               business_uuid: "dd831cb9-8e76-49db-bede-043396f57616"
 *               branch: ""
 *               page: 1
 *               total_items: 15
 *               all: "Hector"
 *               date_start: ""
 *               date_end: ""
 *               status_transaction: "ACCEPT"
 *               currency: "GTQ"
 *               filter_column:
 *                 column: "id"
 *                 value: "DESC"
 *     responses:
 *       200:
 *         description: Respuesta exitosa de Pagalo
 *       401:
 *         description: Falta Bearer Token
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
 *     description: Llama al endpoint remoto de Pagalo y requiere Bearer Token
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
 *                 description: UUID del pago
 *             example:
 *               uuid: "abc123-def456-etc"
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