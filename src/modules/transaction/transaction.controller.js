// src/modules/transaction/transaction.controller.js
const axios = require('axios');

/**
 * Llama al endpoint remoto https://api.pagalo.co/v1/integration/transactions
 * con el body y el Bearer token que llegan por la petición local
 */
async function listTransactions(req, res) {
  try {
    // Body que Swagger u otro cliente envía
    const payload = req.body;

    // Header Authorization que se inyecta vía Swagger “Authorize”
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res.status(401).json({ message: 'Falta Bearer Token en Authorization header' });
    }

    // Llamamos al endpoint remoto
    const url = 'https://api.pagalo.co/v1/integration/transactions';

    const pagaloResponse = await axios.post(url, payload, {
      headers: {
        Authorization: tokenHeader,
        'Content-Type': 'application/json'
      }
    });

    // Devolvemos la respuesta tal cual
    return res.status(200).json(pagaloResponse.data);

  } catch (error) {
    console.error('Error en listTransactions:', error.message);
    const statusCode = error.response?.status || 500;
    const data = error.response?.data || { message: 'Error al listar transacciones' };
    return res.status(statusCode).json(data);
  }
}

/**
 * Obtiene la información de un pago específico a partir de un uuid
 * Endpoint remoto: https://api.pagalo.co/v1/integration/payment
 */
async function getPaymentByUUID(req, res) {
  try {
    const { uuid } = req.body;
    if (!uuid) {
      return res.status(400).json({ message: 'Falta uuid en el cuerpo de la petición.' });
    }

    // Bearer token
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res.status(401).json({ message: 'Falta Bearer Token en Authorization header' });
    }

    // Ajusta si la URL real es otra, p.ej https://app.pagalocard.com/v1/integration/payment
    const url = 'https://api.pagalo.co/v1/integration/payment';

    const pagaloResponse = await axios.post(url, { uuid }, {
      headers: {
        Authorization: tokenHeader,
        'Content-Type': 'application/json'
      }
    });

    // Retornamos la respuesta de Pagalo tal cual
    return res.status(200).json(pagaloResponse.data);

  } catch (error) {
    console.error('Error en getPaymentByUUID:', error.message);
    const statusCode = error.response?.status || 500;
    const data = error.response?.data || { message: 'Error al obtener el pago por UUID' };
    return res.status(statusCode).json(data);
  }
}

module.exports = {
  listTransactions,
  getPaymentByUUID,
};