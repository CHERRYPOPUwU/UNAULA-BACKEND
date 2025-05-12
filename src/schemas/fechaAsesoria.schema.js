import * as z from 'zod';

export const fechaAsesoriaSchema = z.object({
    fecha: z.string({
        required_error: "The date of the assessment is required"
    }).refine((date) => !isNaN(Date.parse(date)), {
        message: "Date must be in YYYYY-MM-DD format"
    }),
    hora: z.string({
        required_error: "The time of the assessment is required"
    }).regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
        message: "Time must be in HH:MM or HH:MM:SS format"
    }),
    id_proyecto: z.number({
        required_error: "Project_id is required"
    }).int(),
    id_asesor: z.number({
        required_error:  "Advisor_id is required"
    }).int()
});