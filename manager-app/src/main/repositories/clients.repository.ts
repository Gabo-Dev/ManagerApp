import { db } from '@/db'
import { clientes } from '@/db/schema'
import { nanoid } from 'nanoid'
import { eq } from 'drizzle-orm'

export type Client = typeof clientes.$inferSelect
export type NewClient = typeof clientes.$inferInsert

export const clientRepository = {
  async create(data: Omit<NewClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const [createdClient] = await db.insert(clientes).values({
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }).returning()
    return createdClient
  },

  async getAll(): Promise<Client[]> {
    return db.select().from(clientes)
  },

  async update(id: string, data: Partial<Omit<NewClient, 'id' | 'createdAt'>>): Promise<Client | null> {
    const [updatedClient] = await db.update(clientes)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(clientes.id, id))
      .returning()
    return updatedClient || null
  },

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(clientes).where(eq(clientes.id, id)).returning()
    return result.length > 0
  }
}
