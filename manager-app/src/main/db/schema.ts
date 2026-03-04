import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core'

export const clientes = sqliteTable('clientes', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  email: text('email').notNull().unique(),
  notas: text('notas'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull()
})

export const revisiones = sqliteTable('revisiones', {
  id: text('id').primaryKey(),
  clienteId: text('cliente_id')
    .notNull()
    .references(() => clientes.id, { onDelete: 'cascade' }),
  fecha: text('fecha').notNull(),
  semanaRevision: integer('semana_revision').notNull(),
  sexo: text('sexo', { enum: ['H', 'M'] }).notNull(),
  edad: integer('edad').notNull(),
  estaturaM: real('estatura_m').notNull(),
  etapaActual: text('etapa_actual').notNull(),

  // Pesos
  pesoAyunasKg: real('peso_ayunas_kg').notNull(),
  pesoObjetivoKg: real('peso_objetivo_kg').notNull(),

  // Medidas de Circunferencia
  cuelloCm: real('cuello_cm').notNull(),
  cinturaCm: real('cintura_cm').notNull(),
  caderaCm: real('cadera_cm').notNull(),
  pechoCm: real('pecho_cm').notNull(),
  espaldaCm: real('espalda_cm').notNull(),

  // Extremidades (Lateralidad)
  bicepsIzqCm: real('biceps_izq_cm').notNull(),
  bicepsDerCm: real('biceps_der_cm').notNull(),
  cuadricepsIzqCm: real('cuadriceps_izq_cm').notNull(),
  cuadricepsDerCm: real('cuadriceps_der_cm').notNull(),
  gemeloIzqCm: real('gemelo_izq_cm').notNull(),
  gemeloDerCm: real('gemelo_der_cm').notNull(),

  // Pliegues
  tricipitalMm: real('tricipital_mm').notNull(),
  escapularMm: real('escapular_mm').notNull(),
  abdominalMm: real('abdominal_mm').notNull(),
  cIliacaMm: real('c_iliaca_mm').notNull(),

  // Resultados Calculados
  imc: real('imc').notNull(),
  porcentajeGrasa: real('porcentaje_grasa').notNull(),
  porcentajeGrasaObjetivo: real('porcentaje_grasa_objetivo').notNull(),
  pesoGrasoKg: real('peso_graso_kg').notNull(),
  mlgKg: real('mlg_kg').notNull(),
  porcentajeMme: real('porcentaje_mme').notNull(),
  porcentajeOtros: real('porcentaje_otros').notNull(),

  // Campos adicionales del motor original
  circunferenciaBrazoCm: real('circunferencia_brazo_cm').notNull(),
  circunferenciaMusloCm: real('circunferencia_muslo_cm').notNull(),
  circunferenciaPantorrillaCm: real('circunferencia_pantorrilla_cm').notNull(),

  cicloFemenino: text('ciclo_femenino'),
  observaciones: text('observaciones'),

  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull()
})
