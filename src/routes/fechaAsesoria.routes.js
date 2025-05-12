import Router from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { createFechaAsesoria, getAllFechaAsesoria, updateFechaAsesoria } from '../controller/fechaAsesoria.controller.js';
import { fechaAsesoriaSchema } from '../schemas/fechaAsesoria.schema.js';

const fechaAsesoriaRouter = Router();

fechaAsesoriaRouter.get("/", getAllFechaAsesoria); // Get All  consulting dates
fechaAsesoriaRouter.post("/",validateSchema(fechaAsesoriaSchema) ,createFechaAsesoria); // Create consulting dates
fechaAsesoriaRouter.put("/:id", validateSchema(fechaAsesoriaSchema),  updateFechaAsesoria); // Update consulting dates

export default fechaAsesoriaRouter;