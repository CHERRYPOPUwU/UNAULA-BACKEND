import * as z from 'zod';

export const asesorSchema = z.object({
    nombre : z.string({
        required_error: "Name is required"
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters."),

    especialidad: z.string({
        required_error: "Specialty is required"
    })
    .min(2, "Specialty must be at least 2 characters")
    .max(50, "Specialty cannot be longer than 50 characters"),

    celular: z.string({
        required_error: "The cell phone is required"
    })
    .min(8, "The cell phone must have at least 5 characters")
    .max(12, "The cell phone cannot have more than 40 characters.")
});