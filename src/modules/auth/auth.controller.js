// src/modules/auth/auth.controller.js
const axios = require('axios');

/**
 * Llama al servicio remoto de Pagalo para hacer login.
 * Ajusta la URL según tu doc (https://api.pagalo.co/v1/login o https://app.pagalocard.com/v1/login).
 */
async function loginToPagalo(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan email o password.' });
    }

    // Llamada a Pagalo
    const pagaloResponse = await axios.post('https://api.pagalo.co/v1/login', {
      email,
      password
    });

    // Retorna el token y lo que Pagalo devuelva.
    return res.status(200).json(pagaloResponse.data);

  } catch (error) {
    console.error('Error en login:', error.message);
    const statusCode = error.response?.status || 500;
    const data = error.response?.data || { message: 'Error al hacer login con Pagalo' };
    return res.status(statusCode).json(data);
  }
}

module.exports = {
  loginToPagalo,
};
