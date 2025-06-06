import Router from 'express';
import { carreraSchema } from '../schemas/carrera.schema.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { getAllCarreras, createCarrera, getCarrera, updateCarrera } from '../controller/carrera.controller.js'

const carreraRouter = Router();

carreraRouter.get("/", getAllCarreras); // Get All Careers
carreraRouter.get("/:id", getCarrera); // Get Career
carreraRouter.post("/", validateSchema(carreraSchema), createCarrera); // Create Career
carreraRouter.put("/:id", validateSchema(carreraSchema),  updateCarrera); // Update Career

export default carreraRouter;