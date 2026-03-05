import { useState, useMemo, type FormEvent } from 'react'
import { type Revision } from '@/repositories/revisions.repository'
import {
  BodyMetricsService,
  type CalculatedMetrics
} from '@renderer/core/services/bodyMetrics.service'
import { revisionSchema, type RevisionFormData } from '@shared/schemas/revision.schema'

interface UseRevisionFormProps {
  clientId: string
  initialData?: Revision
  previousRevision?: Revision
  onSuccess: (data: RevisionFormData) => void
}

interface UseRevisionFormReturn {
  formData: Record<string, string>
  calculatedResults: CalculatedMetrics
  missingFields: string[]
  isFormComplete: boolean
  updateField: (name: string, value: string) => void
  handleSubmit: (e: FormEvent) => void
}

export function useRevisionForm({
  clientId,
  initialData,
  previousRevision,
  onSuccess
}: UseRevisionFormProps): UseRevisionFormReturn {
  const [formData, setFormData] = useState<Record<string, string>>({
    clienteId: clientId,
    fecha: initialData?.fecha || new Date().toISOString().split('T')[0],
    semanaRevision: initialData?.semanaRevision?.toString() || '',
    sexo: initialData?.sexo || previousRevision?.sexo || 'H',
    edad: initialData?.edad?.toString() || previousRevision?.edad?.toString() || '',
    estaturaM: initialData?.estaturaM?.toString() || previousRevision?.estaturaM?.toString() || '',
    etapaActual: initialData?.etapaActual || previousRevision?.etapaActual || 'Definición',
    pesoAyunasKg: initialData?.pesoAyunasKg?.toString() || '',
    pesoObjetivoKg:
      initialData?.pesoObjetivoKg?.toString() || previousRevision?.pesoObjetivoKg?.toString() || '',
    cuelloCm: initialData?.cuelloCm?.toString() || '',
    cinturaCm: initialData?.cinturaCm?.toString() || '',
    caderaCm: initialData?.caderaCm?.toString() || '',
    pechoCm: initialData?.pechoCm?.toString() || '',
    espaldaCm: initialData?.espaldaCm?.toString() || '',
    bicepsIzqCm: initialData?.bicepsIzqCm?.toString() || '',
    bicepsDerCm: initialData?.bicepsDerCm?.toString() || '',
    cuadricepsIzqCm: initialData?.cuadricepsIzqCm?.toString() || '',
    cuadricepsDerCm: initialData?.cuadricepsDerCm?.toString() || '',
    gemeloIzqCm: initialData?.gemeloIzqCm?.toString() || '',
    gemeloDerCm: initialData?.gemeloDerCm?.toString() || '',
    tricipitalMm: initialData?.tricipitalMm?.toString() || '',
    escapularMm: initialData?.escapularMm?.toString() || '',
    abdominalMm: initialData?.abdominalMm?.toString() || '',
    cIliacaMm: initialData?.cIliacaMm?.toString() || '',
    porcentajeGrasaObjetivo:
      initialData?.porcentajeGrasaObjetivo?.toString() ||
      previousRevision?.porcentajeGrasaObjetivo?.toString() ||
      '',
    circunferenciaBrazoCm: initialData?.circunferenciaBrazoCm?.toString() || '',
    circunferenciaMusloCm: initialData?.circunferenciaMusloCm?.toString() || '',
    circunferenciaPantorrillaCm: initialData?.circunferenciaPantorrillaCm?.toString() || '',
    tipoActividad: 'suave',
    cicloFemenino: initialData?.cicloFemenino || '',
    observaciones: initialData?.observaciones || ''
  })

  const calculatedResults = useMemo(() => {
    return BodyMetricsService.calculate({
      pesoAyunasKg: parseFloat(formData.pesoAyunasKg) || 0,
      estaturaM: parseFloat(formData.estaturaM) || 0,
      edad: parseInt(formData.edad) || 0,
      sexo: formData.sexo as 'H' | 'M',
      tipoActividad: formData.tipoActividad as 'suave' | 'alto',
      tricipitalMm: parseFloat(formData.tricipitalMm) || 0,
      escapularMm: parseFloat(formData.escapularMm) || 0,
      abdominalMm: parseFloat(formData.abdominalMm) || 0,
      cIliacaMm: parseFloat(formData.cIliacaMm) || 0,
      circunferenciaBrazoCm: parseFloat(formData.circunferenciaBrazoCm) || 0,
      circunferenciaMusloCm: parseFloat(formData.circunferenciaMusloCm) || 0,
      circunferenciaPantorrillaCm: parseFloat(formData.circunferenciaPantorrillaCm) || 0
    })
  }, [formData])

  const missingFields = useMemo(() => {
    const required = [
      'semanaRevision',
      'edad',
      'estaturaM',
      'etapaActual',
      'pesoAyunasKg',
      'pesoObjetivoKg',
      'cuelloCm',
      'cinturaCm',
      'caderaCm',
      'pechoCm',
      'espaldaCm',
      'bicepsIzqCm',
      'bicepsDerCm',
      'cuadricepsIzqCm',
      'cuadricepsDerCm',
      'gemeloIzqCm',
      'gemeloDerCm',
      'tricipitalMm',
      'escapularMm',
      'abdominalMm',
      'cIliacaMm',
      'porcentajeGrasaObjetivo',
      'circunferenciaBrazoCm',
      'circunferenciaMusloCm',
      'circunferenciaPantorrillaCm'
    ]
    return required.filter((f) => !formData[f])
  }, [formData])

  const isFormComplete = formData.fecha !== '' && missingFields.length === 0

  const updateField = (name: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      imc: Number(calculatedResults.imc) || 0,
      porcentajeGrasa: Number(calculatedResults.porcentajeGrasa) || 0,
      pesoGrasoKg: Number(calculatedResults.pesoGrasoKg) || 0,
      mlgKg: Number(calculatedResults.mlgKg) || 0,
      porcentajeMme: Number(calculatedResults.porcentajeMme) || 0,
      porcentajeOtros: Number(calculatedResults.porcentajeOtros) || 0
    }

    const finalObject: Record<string, unknown> = {}
    Object.entries(submissionData).forEach(([key, value]) => {
      if (key === 'tipoActividad') return

      const isString = [
        'fecha',
        'sexo',
        'etapaActual',
        'clienteId',
        'cicloFemenino',
        'observaciones'
      ].includes(key)
      finalObject[key] =
        typeof value === 'string' && value !== '' && !isString ? parseFloat(value) : value
    })

    const validation = revisionSchema.safeParse(finalObject)
    if (validation.success) {
      onSuccess(validation.data)
    } else {
      alert(`Error in validation`)
    }
  }

  return {
    formData,
    calculatedResults,
    missingFields,
    isFormComplete,
    updateField,
    handleSubmit
  }
}
