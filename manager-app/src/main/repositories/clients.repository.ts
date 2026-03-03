import { db } from '../db'
import { clientes } from '../db/schema.ts'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// Infer the type of a new client from the database schema
type NewClient = typeof clientes.$inferInsert


export const clientRepository = {
  /**
   * Create a new client in the database
   * @param data - The data for the new client
   * @returns The created client
   */
}
create async (data: Omit<NewClient, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newClientWithDefaults = {
    ...data,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [createdClient] = await db.insert(clientes).values(newClientWithDefaults).returning();

  return createdClient;
}
