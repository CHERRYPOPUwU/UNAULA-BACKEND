import Router from 'express';
import { proyectoSchema } from '../schemas/proyecto.schema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { createUser, login } from '../controller/usuarios.controller.js';
import { usuarioSchema } from '../schemas/usuarios.schema.js';


const usuariosRouter = Router();

usuariosRouter.post("/login", login); //Login User
usuariosRouter.get("/create",validateSchema(usuarioSchema), createUser); // Create User

export default usuariosRouter;