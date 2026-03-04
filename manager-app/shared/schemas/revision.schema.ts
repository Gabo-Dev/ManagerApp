import { z } from 'zod'

export const RevisionSchema = z.object({
  pesoAyunasKg: z.number().positive('El peso debe ser mayor a 0'),
  estaturaM: z.number().min(0.5, 'Estatura mínima 0.5m').max(2.5, 'Estatura máxima 2.5m'),
  edad: z.number().int().min(1).max(120),
  sexo: z.enum(['H', 'M']),
  tipoActividad: z.enum(['suave', 'alto']),
  pliegues: z.object({
    tricipital: z.number().nonnegative(),
    escapular: z.number().nonnegative(),
    abdominal: z.number().nonnegative(),
    iliaco: z.number().nonnegative()
  }),
  circunferencias: z.object({
    brazo: z.number().nonnegative(),
    muslo: z.number().nonnegative(),
    pantorrilla: z.number().nonnegative()
  })
})

export type RevisionFormData = z.infer<typeof RevisionSchema>
