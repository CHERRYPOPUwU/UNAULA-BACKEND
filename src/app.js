import 'dotenv/config'; // Load environment variables
import Server from './server.js';// Call to the Server created in server.js
const server = new Server();
server.listen(); // Launching the Server