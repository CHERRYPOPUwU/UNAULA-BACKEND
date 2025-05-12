import Router from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { asesorSchema } from '../schemas/asesor.schema.js';
import { getAllAsesores, getAsesor, createAsesor, updateAsesor } from '../controller/asesores.controller.js';

const asesoresRoutes = Router();

asesoresRoutes.get("/", getAllAsesores); // Get all Asesors
asesoresRoutes.get("/:id", getAsesor); // Get Asesors
asesoresRoutes.post("/", validateSchema(asesorSchema), createAsesor); // Create Asesor
asesoresRoutes.put("/:id", validateSchema(asesorSchema),  updateAsesor); // Update Asesor

export default asesoresRoutes;
