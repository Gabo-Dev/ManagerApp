import { type NewClient, type Client } from '@/repositories/clients.repository'

export async function fetchAllClients(): Promise<Client[]> {
  return window.db.getAllClients()
}

export async function createClient(
  data: Omit<NewClient, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Client> {
  return window.db.createClient(data)
}

export async function updateClient(
  id: string,
  data: Partial<Omit<NewClient, 'id' | 'createdAt'>>
): Promise<Client> {
  return window.db.updateClient(id, data)
}

export async function deleteClient(id: string): Promise<boolean> {
  return window.db.deleteClient(id)
}
