import * as z from 'zod';

export const carreraSchema = z.object({
    nombre : z.string({
        required_error: "Name is required"
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot be longer than 50 characters"),

    semestres: z.number({
        required_error: "Semesters are required"
    }).int(),

    facultad: z.string({
        required_error: "Faculty is required"
    })
    .min(5, "Faculty must be at least 5 characters")
    .max(40, "Faculty cannot be more than 40 characters")
});