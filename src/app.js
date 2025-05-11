import 'dotenv/config'; // Cargar variables de entorno
import Server from './server.js';// Llamada al Servidor creado en server.js
const server = new Server();
server.listen(); // Lanzamiento del Servidor