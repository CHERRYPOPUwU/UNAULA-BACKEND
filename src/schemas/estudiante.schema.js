import * as z from 'zod';

export const estudianteSchema = z.object({
    nombre: z.string({
        required_error: "Name is required"
    }).max(255, "Name must not exceed 255 characters."),
    apellidos: z.string({
        required_error: "LastName is required"
    }).max(255, "LastName must not exceed 255 characters."),
    edad: z.number({
        required_error: "Age is required"
    }).int().positive(),
    matriculado: z.boolean({ required_error: "Enrolled is required" }),
    celular: z.string({
        required_error: "Cell phone is required"
    }).max(15, "Cell phone must not exceed 15 characters."),
    id_proyecto: z.number({
        required_error: "Project_id is required"
    }).int(),
    id_carrera: z.number({
        required_error: "Career_id is required"
    }).int()
  });