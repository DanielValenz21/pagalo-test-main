// src/modules/transaction/transaction.controller.js
const axios = require('axios');

async function listTransactions(req, res) {
  try {
    const payload = req.body;
    const tokenHeader = req.headers.authorization;
    
    console.log("[DEBUG] Payload recibido:", JSON.stringify(payload, null, 2));
    console.log("[DEBUG] Authorization header recibido:", tokenHeader);
    
    if (!tokenHeader) {
      console.error("[ERROR] Falta Bearer Token en Authorization");
      return res.status(401).json({ message: 'Falta Bearer Token en Authorization' });
    }
    
    const baseUrl = process.env.PAGALO_API_BASE_URL; // https://api.pagalo.co
    const url = `${baseUrl}/v1/integration/transactions`;
    console.log("[DEBUG] Enviando petición POST a:", url);
    
    const pagaloResponse = await axios.post(url, payload, {
      headers: {
        Authorization: tokenHeader,
        'Content-Type': 'application/json'
      }
    });
    
    console.log("[DEBUG] Respuesta de Pagalo:", JSON.stringify(pagaloResponse.data, null, 2));
    return res.status(200).json(pagaloResponse.data);
  } catch (error) {
    if (error.response) {
      console.error("[ERROR] Respuesta de error:", JSON.stringify(error.response.data, null, 2));
      return res.status(error.response.status).json({
        message: 'Error en listTransactions',
        error: error.response.data
      });
    } else {
      console.error("[ERROR] Error:", error.message);
      return res.status(500).json({ message: 'Error en listTransactions', error: error.message });
    }
  }
}

async function getPaymentByUUID(req, res) {
  try {
    const { uuid } = req.body;
    const tokenHeader = req.headers.authorization;
    
    console.log("[DEBUG] UUID recibido:", uuid);
    console.log("[DEBUG] Authorization header recibido:", tokenHeader);
    
    if (!uuid) {
      console.error("[ERROR] Falta uuid en el body");
      return res.status(400).json({ message: 'Falta uuid en el body.' });
    }
    if (!tokenHeader) {
      console.error("[ERROR] Falta Bearer Token en el header");
      return res.status(401).json({ message: 'Falta Bearer Token en Authorization' });
    }
    
    const baseUrl = process.env.PAGALO_API_BASE_URL;
    const url = `${baseUrl}/v1/integration/payment`;
    console.log("[DEBUG] Enviando petición POST a:", url);
    
    const pagaloResponse = await axios.post(url, { uuid }, {
      headers: {
        Authorization: tokenHeader,
        'Content-Type': 'application/json'
      }
    });
    
    console.log("[DEBUG] Respuesta de Pagalo:", JSON.stringify(pagaloResponse.data, null, 2));
    return res.status(200).json(pagaloResponse.data);
  } catch (error) {
    if (error.response) {
      console.error("[ERROR] Respuesta de error:", JSON.stringify(error.response.data, null, 2));
      return res.status(error.response.status).json({
        message: 'Error en getPaymentByUUID',
        error: error.response.data
      });
    } else {
      console.error("[ERROR] Error:", error.message);
      return res.status(500).json({ message: 'Error en getPaymentByUUID', error: error.message });
    }
  }
}

module.exports = {
  listTransactions,
  getPaymentByUUID
};