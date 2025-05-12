import Router from 'express';
import { proyectoSchema } from '../schemas/proyecto.schema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { getAllProjects, getProject, createProject, updateProject, getAllIncompletProject } from '../controller/proyectos.controller.js';


const proyectosRoutes = Router();

proyectosRoutes.get("/", getAllProjects); // Get All Projects
proyectosRoutes.get("/incompletos", getAllIncompletProject); //Get All Incomplete Projects
proyectosRoutes.get("/:id", getProject); // Get Project
proyectosRoutes.post("/", validateSchema(proyectoSchema), createProject); // Create Project
proyectosRoutes.put("/:id", validateSchema(proyectoSchema),  updateProject); // Update Project

export default proyectosRoutes;