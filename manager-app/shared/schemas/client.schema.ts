import { z } from 'zod'

export const clientSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Introduce un correo electrónico válido.'),
  notas: z.string().max(500, 'Las notas no pueden superar los 500 caracteres.').optional()
})

export type ClientFormData = z.infer<typeof clientSchema>
