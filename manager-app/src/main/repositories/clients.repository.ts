import { db } from '@/db'
import { clientes } from '@/db/schema'
import { nanoid } from 'nanoid'

// Definimos los tipos que vamos a usar, inferidos directamente desde el esquema.
// Esto es una práctica excelente para mantener la consistencia.
export type Client = typeof clientes.$inferSelect
export type NewClient = typeof clientes.$inferInsert

export const clientRepository = {
  /**
   * Crea un nuevo cliente en la base de datos.
   * @param data - Los datos del cliente a crear (sin id ni timestamps).
   * @returns El cliente recién creado con todos sus campos.
   */
  async create(data: Omit<NewClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    console.log('Creando cliente con data:', data)
    const newClientWithDefaults = {
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const [createdClient] = await db.insert(clientes).values(newClientWithDefaults).returning()

    console.log('Cliente creado:', createdClient)
    return createdClient
  },

  /**
   * Obtiene todos los clientes de la base de datos.
   * @returns Un array con todos los clientes.
   */
  async getAll(): Promise<Client[]> {
    console.log('Obteniendo todos los clientes...')
    return db.select().from(clientes)
  }
}
