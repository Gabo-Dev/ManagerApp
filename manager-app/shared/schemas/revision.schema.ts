import { z } from 'zod'

export const revisionSchema = z.object({
  clienteId: z.string().min(1, 'ID de cliente obligatorio'),
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  semanaRevision: z.number().int().min(0),
  sexo: z.enum(['H', 'M']),
  edad: z.number().int().min(1).max(120),
  estaturaM: z.number().min(0.5).max(2.5),
  etapaActual: z.string().min(1),

  // Pesos
  pesoAyunasKg: z.number().positive(),
  pesoObjetivoKg: z.number().positive(),

  // Perímetros
  cuelloCm: z.number().nonnegative(),
  cinturaCm: z.number().nonnegative(),
  caderaCm: z.number().nonnegative(),
  pechoCm: z.number().nonnegative(),
  espaldaCm: z.number().nonnegative(),

  // Extremidades (Lateralidad)
  bicepsIzqCm: z.number().nonnegative(),
  bicepsDerCm: z.number().nonnegative(),
  cuadricepsIzqCm: z.number().nonnegative(),
  cuadricepsDerCm: z.number().nonnegative(),
  gemeloIzqCm: z.number().nonnegative(),
  gemeloDerCm: z.number().nonnegative(),

  // Pliegues
  tricipitalMm: z.number().nonnegative(),
  escapularMm: z.number().nonnegative(),
  abdominalMm: z.number().nonnegative(),
  cIliacaMm: z.number().nonnegative(),

  // Resultados Calculados (Zod los valida por si vienen del motor)
  imc: z.number().optional(),
  porcentajeGrasa: z.number().optional(),
  porcentajeGrasaObjetivo: z.number().nonnegative(),
  pesoGrasoKg: z.number().optional(),
  mlgKg: z.number().optional(),
  porcentajeMme: z.number().optional(),
  porcentajeOtros: z.number().optional(),

  // Campos adicionales motor
  circunferenciaBrazoCm: z.number().nonnegative(),
  circunferenciaMusloCm: z.number().nonnegative(),
  circunferenciaPantorrillaCm: z.number().nonnegative(),

  cicloFemenino: z.string().optional().nullable(),
  observaciones: z.string().optional().nullable()
})

export type RevisionFormData = z.infer<typeof revisionSchema>
