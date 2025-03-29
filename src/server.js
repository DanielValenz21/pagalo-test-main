// src/server.js
const app = require('./app');

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI en http://localhost:${PORT}/api-docs`);
});
