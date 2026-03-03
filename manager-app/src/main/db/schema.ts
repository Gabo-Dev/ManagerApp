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

  edad: integer('edad').notNull(),
  sexo: text('sexo', { enum: ['H', 'M'] }).notNull(),
  tipoActividad: text('tipo_actividad', { enum: ['suave', 'alto'] }).notNull(),
  pesoAyunasKg: real('peso_ayunas_kg').notNull(),
  estaturaM: real('estatura_m').notNull(),

  pliegueTricipital: real('pliegue_tricipital').notNull(),
  pliegueEscapular: real('pliegue_escapular').notNull(),
  pliegueAbdominal: real('pliegue_abdominal').notNull(),
  pliegueIliaco: real('pliegue_iliaco').notNull(),

  circunferenciaBrazo: real('circunferencia_brazo').notNull(),
  circunferenciaMuslo: real('circunferencia_muslo').notNull(),
  circunferenciaPantorrilla: real('circunferencia_pantorrilla').notNull(),

  medidaCuello: real('medida_cuello'),
  medidaCintura: real('medida_cintura'),
  medidaCadera: real('medida_cadera'),
  medidaPecho: real('medida_pecho'),
  medidaEspalda: real('medida_espalda'),
  medidaBiceps: real('medida_biceps'),
  medidaCuadriceps: real('medida_cuadriceps'),
  medidaGemelo: real('medida_gemelo'),

  imc: real('imc').notNull(),
  porcentajeGrasa: real('porcentaje_grasa').notNull(),
  pesoGrasoKg: real('peso_graso_kg').notNull(),
  mlgKg: real('mlg_kg').notNull(),
  porcentajeMME: real('porcentaje_mme').notNull(),
  porcentajeOtros: real('porcentaje_otros').notNull(),

  observaciones: text('observaciones')
})
