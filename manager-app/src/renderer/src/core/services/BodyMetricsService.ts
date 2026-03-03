import { CalculosComposicion, TipoActividad } from '@core/entities/Revision'

export interface BodyMetricsInput {
  pesoKg: number
  estaturaM: number
  edad: number
  sexo: 'H' | 'M'
  tipoActividad: TipoActividad
  pliegues: {
    tricipital: number
    escapular: number
    abdominal: number
    iliaco: number
  }
  circunferencias: {
    brazo: number

    pantorrilla: number
  }
}

export class BodyMetricsService {
  public static calcular(input: BodyMetricsInput): CalculosComposicion {
    const { pesoKg, estaturaM, edad, sexo, tipoActividad, pliegues, circunferencias } = input

    const imc = Number((pesoKg / Math.pow(estaturaM, 2)).toFixed(2))

    const suma4Pliegues =
      pliegues.tricipital + pliegues.escapular + pliegues.abdominal + pliegues.iliaco
    const logSuma = Math.log10(suma4Pliegues || 1)

    let densidad = 0
    if (tipoActividad === 'suave') {
      densidad = sexo === 'H' ? 1.162 - 0.063 * logSuma : 1.1339 - 0.0645 * logSuma
    } else {
      densidad = sexo === 'H' ? 1.1714 - 0.0671 * logSuma : 1.1665 - 0.0706 * logSuma
    }

    let porcentajeGrasa = 495 / densidad - 450
    porcentajeGrasa = Math.max(3, Math.min(50, porcentajeGrasa))

    const pesoGrasoKg = Number(((pesoKg * porcentajeGrasa) / 100).toFixed(2))
    const mlgKg = Number((pesoKg - pesoGrasoKg).toFixed(2))

    const sexFactor = sexo === 'H' ? 1 : 0
    const mmeKg =
      estaturaM *
        (0.00744 * Math.pow(circunferencias.brazo, 2) +
          0.00088 * Math.pow(circunferencias.muslo, 2) +
          0.00441 * Math.pow(circunferencias.pantorrilla, 2)) +
      2.4 * sexFactor -
      0.048 * edad +
      7.8

    const porcentajeMME = Number(((mmeKg / pesoKg) * 100).toFixed(2))
    const porcentajeOtros = Number((100 - porcentajeGrasa - porcentajeMME).toFixed(2))

    return {
      imc,
      porcentajeGrasa: Number(porcentajeGrasa.toFixed(2)),
      pesoGrasoKg,
      mlgKg,
      porcentajeMME,
      porcentajeOtros: Math.max(0, porcentajeOtros)
    }
  }
}
