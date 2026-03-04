import { db } from '@/db'
import { revisiones } from '@/db/schema'
import { nanoid } from 'nanoid'
import { eq } from 'drizzle-orm'

export type Revision = typeof revisiones.$inferSelect
export type NewRevision = typeof revisiones.$inferInsert

export const revisionRepository = {
  async create(data: Omit<NewRevision, 'id' | 'createdAt' | 'updatedAt'>): Promise<Revision> {
    const [createdRevision] = await db.insert(revisiones).values({
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }).returning()
    return createdRevision
  },

  async getAll(clientId: string): Promise<Revision[]> {
    return db.select().from(revisiones).where(eq(revisiones.clienteId, clientId))
  },

  async update(id: string, data: Partial<Omit<NewRevision, 'id' | 'createdAt'>>): Promise<Revision | null> {
    const [updatedRevision] = await db.update(revisiones)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(revisiones.id, id))
      .returning()
    return updatedRevision || null
  },

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(revisiones).where(eq(revisiones.id, id)).returning()
    return result.length > 0
  }
}
