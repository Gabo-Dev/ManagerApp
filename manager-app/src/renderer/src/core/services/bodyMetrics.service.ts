export interface MetricInputs {
  pesoAyunasKg: number
  estaturaM: number
  edad: number
  sexo: 'H' | 'M'
  tipoActividad: 'suave' | 'alto'
  tricipitalMm: number
  escapularMm: number
  abdominalMm: number
  cIliacaMm: number
  circunferenciaBrazoCm: number
  circunferenciaMusloCm: number
  circunferenciaPantorrillaCm: number
}

export interface CalculatedMetrics {
  imc: number | string
  porcentajeGrasa: number | string
  pesoGrasoKg: number | string
  mlgKg: number | string
  porcentajeMme: number | string
  porcentajeOtros: number | string
}

export const BodyMetricsService = {
  calculate(inputs: MetricInputs): CalculatedMetrics {
    const {
      pesoAyunasKg,
      estaturaM,
      edad,
      sexo,
      tipoActividad,
      tricipitalMm,
      escapularMm,
      abdominalMm,
      cIliacaMm,
      circunferenciaBrazoCm,
      circunferenciaMusloCm,
      circunferenciaPantorrillaCm
    } = inputs

    const metrics: CalculatedMetrics = {
      imc: '',
      porcentajeGrasa: '',
      pesoGrasoKg: '',
      mlgKg: '',
      porcentajeMme: '',
      porcentajeOtros: ''
    }

    if (pesoAyunasKg > 0 && estaturaM > 0) {
      metrics.imc = parseFloat((pesoAyunasKg / Math.pow(estaturaM, 2)).toFixed(2))
    }

    const suma4Pliegues = tricipitalMm + escapularMm + abdominalMm + cIliacaMm
    let densidadCorporal = 0

    if (suma4Pliegues > 0) {
      if (tipoActividad === 'suave') {
        densidadCorporal =
          sexo === 'H'
            ? 1.162 - 0.063 * Math.log10(suma4Pliegues)
            : 1.1339 - 0.0645 * Math.log10(suma4Pliegues)
      } else {
        densidadCorporal =
          sexo === 'H'
            ? 1.1714 - 0.0671 * Math.log10(suma4Pliegues)
            : 1.1665 - 0.0706 * Math.log10(suma4Pliegues)
      }
    }

    if (densidadCorporal > 0) {
      const grasa = 495 / densidadCorporal - 450
      metrics.porcentajeGrasa = parseFloat(Math.max(3, Math.min(50, grasa)).toFixed(2))

      if (pesoAyunasKg > 0) {
        metrics.pesoGrasoKg = parseFloat(
          ((pesoAyunasKg * (metrics.porcentajeGrasa as number)) / 100).toFixed(2)
        )
        metrics.mlgKg = parseFloat((pesoAyunasKg - (metrics.pesoGrasoKg as number)).toFixed(2))
      }
    }

    const hasMMEInputs =
      pesoAyunasKg > 0 &&
      estaturaM > 0 &&
      edad > 0 &&
      circunferenciaBrazoCm > 0 &&
      circunferenciaMusloCm > 0 &&
      circunferenciaPantorrillaCm > 0

    if (hasMMEInputs) {
      const sexFactor = sexo === 'H' ? 1 : 0
      const mme =
        estaturaM *
          (0.00744 * Math.pow(circunferenciaBrazoCm, 2) +
            0.00088 * Math.pow(circunferenciaMusloCm, 2) +
            0.00441 * Math.pow(circunferenciaPantorrillaCm, 2)) +
        2.4 * sexFactor -
        0.048 * edad +
        7.8

      metrics.porcentajeMme = parseFloat(mme.toFixed(2))

      if (typeof metrics.porcentajeGrasa === 'number') {
        metrics.porcentajeOtros = parseFloat(
          Math.max(0, 100 - metrics.porcentajeGrasa - (metrics.porcentajeMme as number)).toFixed(2)
        )
      }
    }

    return metrics
  }
}
