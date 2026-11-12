import { z } from 'zod';

export const serviceValidationSchema = z.object({
    name: z.string({ required_error: "El nombre es obligatorio" }).min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string({ required_error: "La descripción es obligatoria" }),
    duration: z.number({ required_error: "La duración es obligatoria" }).positive("La duración debe ser mayor a 0"),
    price: z.number({ required_error: "El precio es obligatorio" }).positive("El precio debe ser mayor a 0"),
    category: z.string({ required_error: "La categoría es obligatoria" }),
    available: z.boolean().optional()
});

export const validateService = (req, res, next) => {
    try {
        serviceValidationSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos de servicio inválidos',
            errors: error.errors.map(err => err.message)
        });
    }
};