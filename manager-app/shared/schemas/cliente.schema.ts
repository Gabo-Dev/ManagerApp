import { z } from 'zod'

export const ClienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio.'),
  email: z.string().email('Introduce un correo electrónico válido.'),
  notas: z.string().max(500, 'Las notas no pueden supera los 500 caracteres').optional()
})

export type ClienteFormData = z.infer<typeof ClienteSchema>

