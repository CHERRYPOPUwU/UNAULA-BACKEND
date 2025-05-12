import * as z from 'zod';

export const proyectoSchema = z.object({
    nombre: z.string({
        required_error: "The name is required"
    }).max(255, "The name must not exceed 255 characters"),
    tipo: z.string({
        required_error: "The type is required"
    }).max(255, "The type must not exceed 255 characters."),
    tema: z.string({
        required_error: "Subject is required."
    }).max(255, "Subject must not exceed 255 characters."),
    estado: z.enum(["Aprobado", "En proceso"], {
      required_error: "Status is required and must be 'Aprobado' or 'En proceso"
    }),
    id_asesor: z.number({
        required_error: "Advisor_id is required"
    }).int(),
  });