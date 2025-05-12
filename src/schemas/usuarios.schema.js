import * as z from 'zod';

export const usuarioSchema = z.object({
    nombre: z.string({
        required_error: "The name is required"
    }).max(255, "The name must not exceed 255 characters."),
    documento: z.number({
        required_error: "The document is required"
    }),
    password: z.string({
        required_error: "The password is required"
    }).max(255, "The subject must not exceed 255 characters."),
    rol: z.enum(['Estudiante', 'Profesor', 'Asesor', 'Administrativo'], {
      required_error: "The status is required and must be 'Estudiante','Profesor','Asesor' or Administrativo."
    }),
  });