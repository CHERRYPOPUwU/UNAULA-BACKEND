import Router from 'express';
import { generateProjectReport } from '../controller/informes.controller.js';


const informesRouter = Router();

informesRouter.get("/proyectos/:id", generateProjectReport); // Get inform by project

export default informesRouter;