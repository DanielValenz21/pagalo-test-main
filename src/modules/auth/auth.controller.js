// src/modules/auth/auth.controller.js
const axios = require('axios');

async function loginToPagalo(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan email o password.' });
    }

    // Se usa la URL de producción definida en .env
    const baseUrl = process.env.PAGALO_API_BASE_URL; // https://api.pagalo.co
    const urlLogin = `${baseUrl}/v1/login`;

    console.log("[DEBUG] Enviando login a:", urlLogin);
    console.log("[DEBUG] Payload de login:", JSON.stringify({ email, password }, null, 2));

    const pagaloResponse = await axios.post(urlLogin, { email, password });
    console.log("[DEBUG] Respuesta login:", JSON.stringify(pagaloResponse.data, null, 2));
    
    return res.status(200).json(pagaloResponse.data);
  } catch (error) {
    console.error("[ERROR] Login:", error?.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const data = error.response?.data || { message: 'Error al hacer login con Pagalo' };
    return res.status(statusCode).json(data);
  }
}

module.exports = {
  loginToPagalo,
};