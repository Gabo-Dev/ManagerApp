import { describe, it, expect } from 'vitest'
import { clientSchema, type ClientFormData } from '@shared/schemas/client.schema'

const createBaseInputs = (): Partial<ClientFormData> => ({
  nombre: 'Jule',
  email: 'esto-no-es-un-email',
  notas: 'Algunas notas'
})

describe('clientSchema', () => {
  it('debe fallar si el email no es valido', () => {
    const invalidInput = createBaseInputs()

    const result = clientSchema.safeParse(invalidInput)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Introduce un correo electrónico válido.')
    }
  })

  it('debe pasar si todos los datos son válidos', () => {
    // Arrange
    const validInput: ClientFormData = {
      nombre: 'Julen Iturbe',
      email: 'julen@valido.com',
      notas: 'Todo correcto.'
    }
    // Act
    const result = clientSchema.safeParse(validInput)
    // Assert
    expect(result.success).toBe(true)
  })
})
