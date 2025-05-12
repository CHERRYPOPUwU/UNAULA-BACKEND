import Router from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { createEstudiante, getAllEstudiantes, getEstudiante, updateEstudiante } from '../controller/estudiantes.controller.js';
import { estudianteSchema } from '../schemas/estudiante.schema.js';

const estudiantesRouter = Router();

estudiantesRouter.get("/", getAllEstudiantes); //Get All Students
estudiantesRouter.get("/:id", getEstudiante); // Get Students 
estudiantesRouter.post("/",validateSchema(estudianteSchema), createEstudiante); // Create Students
estudiantesRouter.put("/:id", validateSchema(estudianteSchema),  updateEstudiante); // Update Students

export default estudiantesRouter;