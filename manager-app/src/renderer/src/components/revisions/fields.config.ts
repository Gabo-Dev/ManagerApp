import { Calendar, Ruler, Layers, Target, TrendingUp, User, type LucideIcon } from 'lucide-react'
import { type Revision } from '@/repositories/revisions.repository'

// Tipado estricto para asegurar que los nombres de los campos
// coincidan exactamente con la base de datos.
export type RevisionFieldName = keyof Omit<Revision, 'id' | 'createdAt' | 'updatedAt' | 'clienteId'>

export interface FieldConfig {
  name: RevisionFieldName
  label: string
  type?: 'number' | 'date' | 'select' | 'text'
  step?: number
  required?: boolean
  isPrimary?: boolean
  isCalculated?: boolean
}

export interface SectionConfig {
  title: string
  icon: LucideIcon
  fields: FieldConfig[]
}

export const REVISION_SECTIONS: SectionConfig[] = [
  {
    title: 'Sesión',
    icon: Calendar,
    fields: [
      { name: 'fecha', label: 'Fecha', type: 'date', required: true },
      { name: 'semanaRevision', label: 'Semana', step: 1, required: true },
      { name: 'edad', label: 'Edad', step: 1, required: true, isPrimary: true },
      { name: 'estaturaM', label: 'Estatura (m)', step: 0.01, required: true, isPrimary: true },
      { name: 'sexo', label: 'Sexo', type: 'select', required: true, isPrimary: true },
      { name: 'etapaActual', label: 'Etapa Actual', type: 'text', required: true }
    ]
  },
  {
    title: 'Objetivos',
    icon: Target,
    fields: [
      { name: 'pesoAyunasKg', label: 'Peso Ayunas (kg)', required: true, isPrimary: true },
      { name: 'pesoObjetivoKg', label: 'Peso Objetivo (kg)', required: true },
      { name: 'porcentajeGrasaObjetivo', label: '% Grasa Obj.', required: true }
    ]
  },
  {
    title: 'Tronco (Perímetros)',
    icon: Ruler,
    fields: [
      { name: 'cuelloCm', label: 'Cuello (cm)', required: true },
      { name: 'cinturaCm', label: 'Cintura (cm)', required: true },
      { name: 'caderaCm', label: 'Cadera (cm)', required: true },
      { name: 'pechoCm', label: 'Pecho (cm)', required: true },
      { name: 'espaldaCm', label: 'Espalda (cm)', required: true }
    ]
  },
  {
    title: 'Extremidades (cm)',
    icon: User,
    fields: [
      { name: 'bicepsIzqCm', label: 'Bíceps Izq', required: true },
      { name: 'bicepsDerCm', label: 'Bíceps Der', required: true },
      { name: 'cuadricepsIzqCm', label: 'Cuádr. Izq', required: true },
      { name: 'cuadricepsDerCm', label: 'Cuádr. Der', required: true },
      { name: 'gemeloIzqCm', label: 'Gemelo Izq', required: true },
      { name: 'gemeloDerCm', label: 'Gemelo Der', required: true }
    ]
  },
  {
    title: 'Motor Antropométrico',
    icon: Layers,
    fields: [
      { name: 'tricipitalMm', label: 'Tricipital (mm)', required: true, isPrimary: true },
      { name: 'escapularMm', label: 'Escapular (mm)', required: true, isPrimary: true },
      { name: 'abdominalMm', label: 'Abdominal (mm)', required: true, isPrimary: true },
      { name: 'cIliacaMm', label: 'Iliaco (mm)', required: true, isPrimary: true },
      { name: 'circunferenciaBrazoCm', label: 'Brazo (cm)', required: true },
      { name: 'circunferenciaMusloCm', label: 'Muslo (cm)', required: true },
      { name: 'circunferenciaPantorrillaCm', label: 'Pantorrilla (cm)', required: true }
    ]
  },
  {
    title: 'Resultados (Auto)',
    icon: TrendingUp,
    fields: [
      { name: 'imc', label: 'IMC', isCalculated: true },
      { name: 'porcentajeGrasa', label: '% Grasa', isCalculated: true },
      { name: 'pesoGrasoKg', label: 'P. Graso (kg)', isCalculated: true },
      { name: 'mlgKg', label: 'MLG (kg)', isCalculated: true },
      { name: 'porcentajeMme', label: '% MME', isCalculated: true },
      { name: 'porcentajeOtros', label: '% Otros', isCalculated: true }
    ]
  }
]
