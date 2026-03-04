export type TipoActividad = 'suave' | 'alto'

export interface MedidasAntropometricas {
  cuello?: number
  cintura?: number
  cadera?: number
  pecho?: number
  espalda?: number
  biceps?: number
  cuadriceps?: number
  gemelo?: number
}

export interface PlieguesCutaneos {
  tricipital: number
  escapular: number
  abdominal: number
  iliaco: number
}

export interface Circunferencias {
  brazo: number
  muslo: number
  pantorrilla: number
}

export interface CalculosComposicion {
  imc: number
  porcentajeGrasa: number
  pesoGrasoKg: number
  mlgKg: number
  porcentajeMME: number
  porcentajeOtros: number
}

export interface Revision {
  readonly id: string
  readonly clienteId: string
  fecha: Date

  edad: number
  sexo: 'H' | 'M'
  tipoActividad: TipoActividad
  pesoAyunasKg: number
  estaturaM: number

  medidas: MedidasAntropometricas
  pliegues: PlieguesCutaneos
  circunferencias: Circunferencias
  calculos: CalculosComposicion

  observaciones?: string
}

export type CreateRevisionInput = Omit<Revision, 'id'>
