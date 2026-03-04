export interface Cliente {
  readonly id: string
  nombre: string
  email: string
  notas?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Type para la creación de un nuevo cliente
 * Omit para quitar los campos automáticos
 */
export type CreateClienteInput = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>
