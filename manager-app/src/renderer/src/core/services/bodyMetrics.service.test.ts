import { describe, it, expect } from 'vitest'
import { BodyMetricsService, type MetricInputs } from './bodyMetrics.service'

const createBaseInputs = (): MetricInputs => ({
  pesoAyunasKg: 70,
  estaturaM: 1.75,
  edad: 30,
  sexo: 'H',
  tipoActividad: 'suave',
  tricipitalMm: 10,
  escapularMm: 10,
  abdominalMm: 10,
  cIliacaMm: 10,
  circunferenciaBrazoCm: 30,
  circunferenciaMusloCm: 50,
  circunferenciaPantorrillaCm: 35
})

describe('BodyMetricsService', () => {
  it('debe calcular el IMC correctamente con datos válidos', () => {
    // Arrange
    const mockInputs: MetricInputs = {
      pesoAyunasKg: 80,
      estaturaM: 1.8,
      edad: 30,
      sexo: 'H',
      tipoActividad: 'suave',
      tricipitalMm: 10,
      escapularMm: 15,
      abdominalMm: 20,
      cIliacaMm: 18,
      circunferenciaBrazoCm: 35,
      circunferenciaMusloCm: 60,
      circunferenciaPantorrillaCm: 40
    }
    const expectedIMC = 24.69 // 80 / (1.80 * 1.80)

    // Act
    const result = BodyMetricsService.calculate(mockInputs)

    // Assert
    expect(result.imc).toBe(expectedIMC)
  })

  it('debe devolver un IMC vacío si el peso o la altura son cero', () => {
    // Arrange
    const inputsWithZeroWeight: MetricInputs = {
      pesoAyunasKg: 0,
      estaturaM: 1.8,
      edad: 30,
      sexo: 'H',
      tipoActividad: 'suave',
      tricipitalMm: 0,
      escapularMm: 0,
      abdominalMm: 0,
      cIliacaMm: 0,
      circunferenciaBrazoCm: 0,
      circunferenciaMusloCm: 0,
      circunferenciaPantorrillaCm: 0
    }
    const inputsWithZeroHeight: MetricInputs = {
      pesoAyunasKg: 80,
      estaturaM: 0,
      edad: 30,
      sexo: 'H',
      tipoActividad: 'suave',
      tricipitalMm: 0,
      escapularMm: 0,
      abdominalMm: 0,
      cIliacaMm: 0,
      circunferenciaBrazoCm: 0,
      circunferenciaMusloCm: 0,
      circunferenciaPantorrillaCm: 0
    }

    // Act
    const result1 = BodyMetricsService.calculate(inputsWithZeroWeight)
    const result2 = BodyMetricsService.calculate(inputsWithZeroHeight)

    // Assert
    expect(result1.imc).toBe('')
    expect(result2.imc).toBe('')
  })

  it('debe calcular el % de grasa para Hombre con Actividad Suave', () => {
    const inputs = createBaseInputs()

    const result = BodyMetricsService.calculate(inputs)

    expect(result.porcentajeGrasa).toBeCloseTo(16.55, 1) // Valor esperado aproximado
  })
})
